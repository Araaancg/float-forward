class TokenManager {
  private static accessTokenKey = "access_token";
  private static refreshTokenKey = "refresh_token";

  static getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  static setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}

export default TokenManager;