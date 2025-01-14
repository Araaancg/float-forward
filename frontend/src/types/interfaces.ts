export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface ILocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface IToken {
  token: string;
  expires: string;
}

export interface IToast {
  showToast: boolean;
  variant: 'success' | 'error';
  content: { title: string; description: string };
}
