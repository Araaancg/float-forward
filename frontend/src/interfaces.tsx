export interface IIcon {
  size?: number;
  color?: string;
  id?: string;
  className?: string;
}

export interface IUser {
  name?: string | null,
  email?: string | null,
  image?: string | null,
  provider?: "google" | "email"
}
