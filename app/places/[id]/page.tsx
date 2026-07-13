"use client";

import { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaMotorcycle,
  FaDirections,
  FaUtensils,
  FaChevronLeft,
  FaPhone,
  FaMap,
} from "react-icons/fa";
import { restaurants, Restaurant } from "@/lib/data/restaurants";
import Loader from "@/components/UI/Loader";
import { RouteInfo } from "@/components/Map/MapView";

// Dynamic import for map to avoid SSR errors
const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] bg-white/[0.02] border border-white/[0.06] rounded-[2rem] flex items-center justify-center text-gray-500 animate-pulse">
      Loading Location Map...
    </div>
  ),
});

// Auto Open/Close Status
const getRestaurantStatus = (openTime: string, closeTime: string) => {
  const now = new Date();
  const convertTo24Hour = (time: string) => {
    const [hourMinute, modifier] = time.split(" ");
    const [hourStr, minuteStr] = hourMinute.split(":");
    let hours = Number(hourStr);
    const minutes = Number(minuteStr);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const open = convertTo24Hour(openTime);
  const close = convertTo24Hour(closeTime);

  const openDate = new Date(now);
  openDate.setHours(open.hours, open.minutes, 0, 0);

  const closeDate = new Date(now);
  closeDate.setHours(close.hours, close.minutes, 0, 0);

  if (close.hours < open.hours) {
    closeDate.setDate(closeDate.getDate() + 1);
  }

  return now >= openDate && now <= closeDate ? "Open" : "Closed";
};

interface Params {
  id: string;
}

export default function PlaceDetailPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = use(params);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [activeTab, setActiveTab] = useState<"menu" | "info" | "map">("menu");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Could not obtain user location for details route:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const idNum = Number(resolvedParams.id);
    const matched = restaurants.find((r) => r.id === idNum);
    if (matched) {
      setRestaurant({
        ...matched,
        status: getRestaurantStatus(matched.openTime, matched.closeTime),
      });
    }
  }, [resolvedParams.id]);

  if (!restaurant) {
    return <Loader message="Loading food joint details..." />;
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden relative pb-20">
      <Navbar />

      {/* Hero Cover Header */}
      <section className="relative w-full h-[40vh] sm:h-[45vh] lg:h-[50vh] overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-black/35" />

        {/* Back navigation & Float tags */}
        <div className="absolute top-36 left-4 sm:left-8 lg:left-12 z-20 max-w-7xl w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] flex items-center justify-between">
          <Link href="/restaurants">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-black/60 border border-white/10 backdrop-blur-md rounded-xl text-xs sm:text-sm font-bold text-gray-300 hover:text-white hover:border-orange-500/40 hover:bg-black/85 transition-all duration-300 cursor-pointer">
              <FaChevronLeft />
              Back to Food Joints
            </button>
          </Link>

          <span
            className={`text-xs sm:text-sm font-black px-4.5 py-2 rounded-full border shadow-lg backdrop-blur-md ${
              restaurant.status === "Open"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            {restaurant.status}
          </span>
        </div>

        {/* Details Overlay Block */}
        <div className="absolute bottom-6 left-4 sm:left-8 lg:left-12 z-20 max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-black px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-3.5 leading-tight tracking-tight">
            {restaurant.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" />
              <span>{restaurant.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-orange-500" />
              <span>
                {restaurant.openTime} - {restaurant.closeTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        {/* Tab Headers Row */}
        <div className="flex border-b border-border-custom mb-10 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            { id: "menu", label: "Menu List", icon: <FaUtensils /> },
            { id: "map", label: "Location Map", icon: <FaMap /> },
            { id: "info", label: "About & Hours", icon: <FaClock /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-6 py-4.5 border-b-2 font-extrabold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="w-full">
          {/* MENU TAB */}
          {activeTab === "menu" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurant.menu.map((item, index) => (
                  <div
                    key={index}
                    className="bg-bg-secondary border border-border-custom rounded-[2rem] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-orange-500/25 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4.5">
                      <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 flex-shrink-0 text-lg">
                        <FaUtensils />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base sm:text-lg mb-1 text-text-primary">{item.name}</h3>
                        <span className="text-orange-400 font-black text-sm">{item.price}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${
                        restaurant.whatsapp
                      }?text=Hello%20${encodeURIComponent(
                        restaurant.name
                      )}!%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(
                        item.name
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all duration-250 shadow-md shadow-green-600/10"
                    >
                      <FaWhatsapp className="text-sm" />
                      Order on WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAP TAB */}
          {activeTab === "map" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-bg-secondary border border-border-custom rounded-[2.5rem] p-4">
                <MapView
                  restaurants={[restaurant]}
                  userLocation={userLocation}
                  routeTarget={{ lat: restaurant.lat, lng: restaurant.lng }}
                  onRouteCalculated={(info) => setRouteInfo(info)}
                  height="400px"
                />
              </div>

              {routeInfo && (
                <div className="grid grid-cols-2 gap-4 bg-bg-secondary border border-border-custom rounded-3xl p-5">
                  <div className="text-center py-2">
                    <div className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-1">Road Distance</div>
                    <div className="text-lg font-black text-orange-400">{routeInfo.distanceKm.toFixed(1)} KM</div>
                  </div>
                  <div className="text-center py-2">
                    <div className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-1">Est. Drive Time</div>
                    <div className="text-lg font-black text-orange-400">{Math.round(routeInfo.durationMins)} mins</div>
                  </div>
                </div>
              )}

              {/* Turn-by-Turn Navigation Steps */}
              {routeInfo && routeInfo.steps && routeInfo.steps.length > 0 && (
                <div className="bg-bg-secondary border border-border-custom rounded-3xl p-6">
                  <h4 className="font-bold text-base mb-4 flex items-center gap-2.5 text-orange-400">
                    <FaDirections className="text-lg" />
                    Turn-by-Turn Navigation Steps
                  </h4>
                  <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
                    {routeInfo.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start py-2.5 border-b border-border-custom last:border-none">
                        <span className="w-5.5 h-5.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center text-xs font-black flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-text-primary text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-6 bg-bg-secondary border border-border-custom rounded-3xl">
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1 text-text-primary">Need External Navigation?</h4>
                  <p className="text-text-secondary text-xs">Route coordinates on external apps like Google Maps.</p>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-600/10"
                >
                  <FaDirections className="text-sm" />
                  Google Maps
                </a>
              </div>
            </div>
          )}

          {/* INFO TAB */}
          {activeTab === "info" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Details column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-bg-secondary border border-border-custom rounded-[2rem] p-8">
                  <h3 className="text-xl font-bold mb-4 text-text-primary">About the Food Joint</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {restaurant.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3.5 bg-bg-primary border border-border-custom rounded-2xl px-5 py-4">
                      <FaMotorcycle className="text-orange-500 text-xl" />
                      <div>
                        <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                          Services
                        </div>
                        <div className="text-sm font-semibold text-text-primary">{restaurant.delivery}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5 bg-bg-primary border border-border-custom rounded-2xl px-5 py-4">
                      <FaPhone className="text-orange-500 text-xl" />
                      <div>
                        <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                          WhatsApp Call
                        </div>
                        <div className="text-sm font-semibold text-text-primary">+{restaurant.whatsapp}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Hours column */}
              <div className="bg-bg-secondary border border-border-custom rounded-[2rem] p-8">
                <h3 className="text-xl font-bold mb-6 text-text-primary">Operating Slots</h3>
                <div className="space-y-4">
                  {[
                    { label: "Opening Time", value: restaurant.openTime },
                    { label: "Closing Time", value: restaurant.closeTime },
                    { label: "Status Now", value: restaurant.status, highlight: true },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-border-custom last:border-none pb-4 last:pb-0"
                    >
                      <span className="text-text-secondary text-sm font-medium">{row.label}</span>
                      {row.highlight ? (
                        <span
                          className={`text-xs font-black px-3 py-1 rounded-full border ${
                            row.value === "Open"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          }`}
                        >
                          {row.value}
                        </span>
                      ) : (
                        <span className="font-bold text-sm text-text-primary">{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}