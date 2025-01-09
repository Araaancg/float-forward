import TokenManager from "@/storage/tokenManager";

class ApiClient {
  private baseURL: string;
  private isRefreshing: boolean;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    this.baseURL = "/api";
    this.isRefreshing = false;
  }

  private async request(
    endpoint: string,
    options: RequestInit
  ): Promise<Response> {
    const accessToken = TokenManager.getAccessToken();

    const headers: any = {
      ...options.headers,
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      return this.handle401(endpoint, options);
    }

    return response;
  }

  private async handle401(
    endpoint: string,
    options: RequestInit
  ): Promise<Response> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      try {
        const newAccessToken = await this.refreshToken();
        this.isRefreshing = false;
        this.notifySubscribers(newAccessToken);
      } catch (error) {
        this.isRefreshing = false;
        TokenManager.clearTokens();
        window.location.href = "/auth/login"; // Redirect to login
        throw error;
      }
    }

    return new Promise((resolve) => {
      this.subscribeToTokenRefresh((token) => {
        const headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
        resolve(fetch(`${this.baseURL}${endpoint}`, { ...options, headers }));
      });
    });
  }

  private async refreshToken(): Promise<string> {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await response.json();

    TokenManager.setTokens(accessToken, newRefreshToken);
    return accessToken;
  }

  private notifySubscribers(newAccessToken: string): void {
    this.refreshSubscribers.forEach((callback) => callback(newAccessToken));
    this.refreshSubscribers = [];
  }

  private subscribeToTokenRefresh(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  public async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await this.request(endpoint, {
      ...options,
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }

  public async post<T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }
}

export default ApiClient;
