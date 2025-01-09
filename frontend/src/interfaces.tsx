export interface IIcon {
  size?: number;
  color?: string;
  id?: string;
  className?: string;
}

export interface IUser {
  _id: string;
  name?: string | null;
  email?: string | null;
  profilePicture?: string | null;
  authProvider?: "google" | "email";
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface IDisasters {
  _id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  slug: string;
  date?: string;
  images: IImages[];
  additionalInformation: IAddiontionalInformation[];
  pins: IPin[];
}

export interface IAddiontionalInformation {
  _id: string;
  images?: IImages[];
  link: string;
  title: string;
  description: string;
  type: ITypeInformation;
  disasterId: string;
}

export type TActionTypes =
  | "Help Request"
  | "Collection Point"
  | "Medical Point"
  | "Missings"
  | "Help Offer"
  | "Information Point";

export interface IPin {
  _id: string;
  type: ITypeInformation;
  title: string;
  description: string;
  additionalInfo?: string;
  latitude: number;
  longitude: number;
  address: string;
  user: IUser;
  disasterId: string;
}

export interface ITypeInformation {
  _id: string;
  title: string;
  description: string;
}

export interface IPinType {
  _id: string;
  title: TActionTypes;
  description?: string;
}

export interface IImages {
  _id: string;
  href: string;
  alt: string;
  author?: string;
  sources?: string;
  link?: string;
}
