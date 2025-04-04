import { IImages } from "./image.types";

export interface IDisaster {
  _id?: string
  title: string;
  description: string;
  country: string;
  city: string;
  slug: string;
  coordinates: { latitude: number; longitude: number };
  date?: string;
  images?: IImages[];
}
