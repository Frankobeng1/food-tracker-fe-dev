"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Restaurant } from "@/types/place";
import Link from "next/link";

// Custom icons
const createRestaurantIcon = () => {
  return L.divIcon({
    className: "custom-restaurant-pin",
    html: `
      <div class="w-9 h-9 bg-orange-500 rounded-2xl border-2 border-white flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform duration-300">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="text-white text-xs w-4 h-4" xmlns="http://www.w3.org/2000/svg">
          <path d="M416 0C400 0 288 32 288 176V288c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V176C192 32 80 0 64 0C50.7 0 38.5 8.2 33.6 20.7L3.6 95.7C1.2 101.6 0 107.9 0 114.3v4.6C0 197 53.4 262.3 128 276.4V448c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V276.4c74.6-14.1 128-69.4 128-157.5v-4.6c0-6.4-1.2-12.7-3.6-18.6L414.4 20.7C409.5 8.2 397.3 0 384 0H416z"></path>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

const createUserIcon = () => {
  return L.divIcon({
    className: "custom-user-pin",
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <span class="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-blue-400 opacity-60"></span>
        <span class="relative inline-flex rounded-full h-4.5 w-4.5 bg-blue-500 border-2 border-white shadow-md shadow-blue-500/40"></span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Component to dynamically adjust map center/zoom when location changes
function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface MapViewProps {
  restaurants: Restaurant[];
  userLocation: { lat: number; lng: number } | null;
  height?: string;
  defaultCenter?: [number, number];
  zoom?: number;
}

export default function MapView({
  restaurants,
  userLocation,
  height = "450px",
  defaultCenter = [7.3399, -2.3268], // Sunyani Central
  zoom = 14,
}: MapViewProps) {
  const centerCoord: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : defaultCenter;

  return (
    <div
      style={{ height }}
      className="w-full rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl relative z-10"
    >
      <MapContainer
        center={centerCoord}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createUserIcon()}
          >
            <Popup>
              <div className="text-black font-semibold text-xs p-1">You are here</div>
            </Popup>
          </Marker>
        )}

        {/* Restaurant Markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.lat, restaurant.lng]}
            icon={createRestaurantIcon()}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-2 text-neutral-900 max-w-[200px]">
                <h3 className="font-extrabold text-sm mb-1 leading-tight">{restaurant.name}</h3>
                <p className="text-[11px] text-gray-500 mb-2">{restaurant.location}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    restaurant.status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {restaurant.status || "Unknown"}
                  </span>
                  <Link
                    href={`/places/${restaurant.id}`}
                    className="text-[10px] font-bold text-orange-600 hover:text-orange-500 transition-colors"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapRecenter center={centerCoord} />
      </MapContainer>
    </div>
  );
}
