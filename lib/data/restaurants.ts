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
  lat: number; // for leaflet backward compatibility
  lng: number; // for leaflet backward compatibility
  description: string;
  image: string;
  tags: string[];
  menu: MenuItem[];
  status?: string;
  calculatedDistance?: number;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Esbak Kitchen",
    location: "Sunyani",
    openTime: "9:00 AM",
    closeTime: "10:00 PM",
    whatsapp: "233000000001",
    delivery: "Delivery Available",
    latitude: 7.3399,
    longitude: -2.3268,
    lat: 7.3399,
    lng: -2.3268,
    description: "A popular choice for Ghanaian and continental dishes with comfortable dining.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
    tags: ["Local", "Continental", "Comfortable"],
    menu: [
      { name: "Jollof Rice", price: "GH₵ 45" },
      { name: "Banku & Tilapia", price: "GH₵ 70" },
      { name: "Chicken Burger", price: "GH₵ 60" },
      { name: "Pizza", price: "GH₵ 80" }
    ]
  },
  {
    id: 2,
    name: "Masada Restaurant",
    location: "Sunyani",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
    whatsapp: "233000000002",
    delivery: "Delivery Available",
    latitude: 7.3365,
    longitude: -2.3150,
    lat: 7.3365,
    lng: -2.3150,
    description: "Known for quality meals and a comfortable atmosphere for relaxed dining.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200",
    tags: ["Quality", "Comfortable", "Local"],
    menu: [
      { name: "Rice Bowl", price: "GH₵ 90" },
      { name: "Chicken Stew", price: "GH₵ 100" },
      { name: "Fried Rice", price: "GH₵ 85" },
      { name: "Salad", price: "GH₵ 60" }
    ]
  },
  {
    id: 3,
    name: "Mandela Restaurant",
    location: "Kumasi-Sunyani Road",
    openTime: "8:00 AM",
    closeTime: "9:00 PM",
    whatsapp: "233000000003",
    delivery: "No Delivery",
    latitude: 7.3421,
    longitude: -2.3012,
    lat: 7.3421,
    lng: -2.3012,
    description: "A popular local spot along the Kumasi-Sunyani Road serving a variety of Ghanaian dishes.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
    tags: ["Local", "Ghanaian", "Roadside"],
    menu: [
      { name: "Waakye", price: "GH₵ 30" },
      { name: "Ampesi", price: "GH₵ 35" },
      { name: "Banku & Okro", price: "GH₵ 45" },
      { name: "Fufu", price: "GH₵ 50" }
    ]
  },
  {
    id: 4,
    name: "KFC Sunyani",
    location: "Sunyani",
    openTime: "10:00 AM",
    closeTime: "10:00 PM",
    whatsapp: "233000000004",
    delivery: "Delivery Available",
    latitude: 7.3350,
    longitude: -2.3200,
    lat: 7.3350,
    lng: -2.3200,
    description: "Fast food spot serving fried chicken, burgers, and fries for quick meals.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
    tags: ["Fast Food", "Quick Bite", "Burger"],
    menu: [
      { name: "Fried Chicken", price: "GH₵ 40" },
      { name: "Burger", price: "GH₵ 35" },
      { name: "Fries", price: "GH₵ 20" },
      { name: "Chicken Bucket", price: "GH₵ 70" }
    ]
  },
  {
    id: 5,
    name: "CS Kitchen (IDABA)",
    location: "Fiapre",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
    whatsapp: "233000000005",
    delivery: "Delivery Available",
    latitude: 7.3500,
    longitude: -2.3400,
    lat: 7.3500,
    lng: -2.3400,
    description: "Located behind the UENR GetFund Hostel in Fiapre, a practical choice for campus visitors.",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200",
    tags: ["Campus", "Local", "Convenient"],
    menu: [
      { name: "Rice & Stew", price: "GH₵ 35" },
      { name: "Kenkey", price: "GH₵ 25" },
      { name: "Tea & Bread", price: "GH₵ 15" },
      { name: "Fried Rice", price: "GH₵ 45" }
    ]
  },
  {
    id: 6,
    name: "Obaa Yaa Chop Bar",
    location: "Sunyani",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
    whatsapp: "233000000006",
    delivery: "Delivery Available",
    latitude: 7.3300,
    longitude: -2.3100,
    lat: 7.3300,
    lng: -2.3100,
    description: "Great for authentic local Ghanaian meals such as fufu, banku, and light soup.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200",
    tags: ["Local", "Authentic", "Ghanaian"],
    menu: [
      { name: "Fufu & Light Soup", price: "GH₵ 50" },
      { name: "Banku & Tilapia", price: "GH₵ 70" },
      { name: "Banku & Okro", price: "GH₵ 45" },
      { name: "Waakye", price: "GH₵ 30" }
    ]
  }
];
