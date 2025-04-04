export interface ITokens {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}

export enum ETokenTypes {
  ACCESS_TOKEN = "access",
  REFRESH_TOKEN = "refresh",
  RESET_PASSWORD_TOKEN = "resetPassword",
  VERIFY_EMAIL_TOKEN = "verifyEmail"
}
