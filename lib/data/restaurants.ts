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
    name: "Sunyani Royal Restaurant",
    location: "Sunyani Central",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
    whatsapp: "233558627995",
    delivery: "Delivery Available",
    latitude: 7.3399,
    longitude: -2.3268,
    lat: 7.3399,
    lng: -2.3268,
    description: "A modern food joint offering local and continental dishes with a relaxing atmosphere.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
    tags: ["Local", "Continental", "Fast Food"],
    menu: [
      { name: "Jollof Rice", price: "GH₵ 45" },
      { name: "Banku & Tilapia", price: "GH₵ 70" },
      { name: "Fried Rice Chicken", price: "GH₵ 55" },
      { name: "Pizza", price: "GH₵ 80" }
    ]
  },
  {
    id: 2,
    name: "African Pot",
    location: "Magazine Area",
    openTime: "9:00 AM",
    closeTime: "11:00 PM",
    whatsapp: "233559815564",
    delivery: "Delivery Available",
    latitude: 7.3365,
    longitude: -2.3150,
    lat: 7.3365,
    lng: -2.3150,
    description: "Popular for traditional Ghanaian meals and affordable food services.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200",
    tags: ["Local"],
    menu: [
      { name: "Fufu & Light Soup", price: "GH₵ 50" },
      { name: "Ampesi", price: "GH₵ 35" },
      { name: "Waakye", price: "GH₵ 30" },
      { name: "Banku & Okro", price: "GH₵ 45" }
    ]
  },
  {
    id: 3,
    name: "Sky View Restaurant",
    location: "Berlin Top",
    openTime: "10:00 AM",
    closeTime: "9:00 PM",
    whatsapp: "233551924746",
    delivery: "No Delivery",
    latitude: 7.3421,
    longitude: -2.3012,
    lat: 7.3421,
    lng: -2.3012,
    description: "A rooftop food joint with beautiful city views and delicious meals.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
    tags: ["Rooftop", "Continental"],
    menu: [
      { name: "Burger & Fries", price: "GH₵ 60" },
      { name: "Chicken Wings", price: "GH₵ 55" },
      { name: "Pasta", price: "GH₵ 70" },
      { name: "Ice Cream", price: "GH₵ 25" }
    ]
  },
  {
    id: 4,
    name: "Sun City Food Court",
    location: "Sunyani Main Town",
    openTime: "7:00 AM",
    closeTime: "12:00 AM",
    whatsapp: "233274445555",
    delivery: "Delivery Available",
    latitude: 7.3350,
    longitude: -2.3200,
    lat: 7.3350,
    lng: -2.3200,
    description: "A food court with multiple food vendors and fast-food services.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
    tags: ["Fast Food"],
    menu: [
      { name: "Shawarma", price: "GH₵ 40" },
      { name: "Fried Rice", price: "GH₵ 50" },
      { name: "Chicken Pizza", price: "GH₵ 90" },
      { name: "Smoothie", price: "GH₵ 20" }
    ]
  }
];
