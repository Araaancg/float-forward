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
  variant: "success" | "error";
  content: { title: string; description: string };
}

export interface IUnreadMessages {
  totalUnreadCount: number;
  unreadMessagesByChat: { [key: string]: number };
}

export interface IAdditionalInformation {
  id: string;
  author: string;
  title: string;
  content: string;
  link: string;
}
