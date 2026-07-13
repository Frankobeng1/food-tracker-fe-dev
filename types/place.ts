export interface MenuItem {
  name: string;
  price: string;
}

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  whatsapp: string;
  delivery: string;
  latitude: number;
  longitude: number;
  lat: number;
  lng: number;
  description: string;
  image: string;
  tags: string[];
  menu: MenuItem[];
  status?: "Open" | "Closed" | string;
  calculatedDistance?: number;
}

export interface NotificationType {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
