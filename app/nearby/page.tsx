"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Toast, { ToastType } from "@/components/UI/Toast";
import Loader from "@/components/UI/Loader";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaClock,
  FaTimes,
  FaWhatsapp,
  FaMotorcycle,
  FaDirections,
  FaBell,
  FaStore,
} from "react-icons/fa";
import { restaurants as baseRestaurants, Restaurant } from "@/lib/data/restaurants";

// Dynamically import Leaflet Map to prevent SSR runtime failures
const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] bg-white/[0.02] border border-white/[0.06] rounded-[2.5rem] flex items-center justify-center text-gray-500 animate-pulse">
      Loading Interactive Map...
    </div>
  ),
});

type RestaurantWithDistance = Restaurant & {
  calculatedDistance?: number;
  status?: string;
};

export default function NearbyPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantWithDistance | null>(null);
  const [userArea, setUserArea] = useState("Detecting...");
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantWithDistance[]>(baseRestaurants);
  const [loading, setLoading] = useState(true);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastType>("info");

  const locationGrantedAlertedRef = useRef(false);

  const showToast = (message: string, type: ToastType = "info") => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    let watchId: number | null = null;

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of Earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const checkRestaurantStatus = (openTime: string, closeTime: string) => {
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

      const openDate = new Date();
      openDate.setHours(open.hours, open.minutes, 0);

      const closeDate = new Date();
      closeDate.setHours(close.hours, close.minutes, 0);

      if (close.hours < open.hours) {
        closeDate.setDate(closeDate.getDate() + 1);
      }

      return now >= openDate && now <= closeDate ? "Open" : "Closed";
    };

    const sendSystemNotification = (title: string, body: string) => {
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/favicon.ico",
        });
      }
    };

    const initLocation = async () => {
      if (typeof window === "undefined") return;

      // Ask for local storage notifications permission (disabled for v1)
      /*
      if ("Notification" in window) {
        Notification.requestPermission();
      }
      */

      if (!navigator.geolocation) {
        showToast("Geolocation is not supported by your browser.", "error");
        return;
      }

      // Check permission state to show proactive status info
      if ("permissions" in navigator) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation" as PermissionName,
          });

          if (permissionStatus.state === "granted") {
            showToast("Fetching nearby food joints based on your live location.", "success");
          } else if (permissionStatus.state === "denied") {
            showToast("Location access is denied. Please enable GPS permissions.", "warning");
          }
        } catch (err) {
          console.error(err);
        }
      }

      // Watch user coordinates
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          if (!locationGrantedAlertedRef.current) {
            showToast("Location access granted. Updating map.", "success");
            locationGrantedAlertedRef.current = true;
          }

          setLocationAllowed(true);
          setLocationError(null);
          setLoading(false);

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ lat: latitude, lng: longitude });

          // Fetch Address from OpenStreetMap
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const area =
              data.address.suburb ||
              data.address.town ||
              data.address.city ||
              data.address.village ||
              data.address.county ||
              "Unknown Area";

            setUserArea(area);
          } catch {
            setUserArea("Active GPS Location");
          }

          // Compute distance and sort
          const sorted = baseRestaurants
            .map((res) => {
              const distance = calculateDistance(latitude, longitude, res.lat, res.lng);
              const status = checkRestaurantStatus(res.openTime, res.closeTime);

              // Send system alerts if open (disabled for v1)
              /*
              if (status === "Open") {
                sendSystemNotification(res.name, `${res.name} is currently OPEN!`);
              }
              */

              return {
                ...res,
                calculatedDistance: distance,
                status,
              };
            })
            .sort((a, b) => (a.calculatedDistance || 0) - (b.calculatedDistance || 0));

          setRestaurants(sorted);
        },
        (error) => {
          console.error(error);
          setLocationAllowed(false);
          setLocationError("denied");
          setLoading(false);

          if (error.code === 1) {
            showToast("Please allow location access in your browser settings.", "error");
          } else if (error.code === 2) {
            showToast("Location unavailable. Turn on your GPS.", "warning");
          } else {
            showToast("Unable to fetch location.", "error");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    };

    initLocation();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const openLocationSettings = () => {
    showToast("Please toggle location settings in browser settings.", "info");
    // Standard URL works in Chrome only
    window.open("chrome://settings/content/location");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  // Preloader while querying browser geolocation
  if (loading) {
    return <Loader message="Detecting your location..." />;
  }

  // Block screen if user location is off
  if (!locationAllowed) {
    return (
      <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center px-4 relative">
        <Navbar />
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-10 max-w-md w-full text-center relative z-10 backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-3xl animate-bounce">
              <FaLocationArrow className="text-orange-500 text-4xl" />
            </div>
          </div>
          <h1 className="text-2xl font-black mb-4">Location Services Required</h1>
          <p className="text-gray-400 leading-relaxed text-sm mb-8">
            {locationError === "denied"
              ? "We need your location permission to sort food joints by distance. Please enable GPS permissions and reload."
              : "Locating you on the map... Please ensure GPS/location access is turned ON."}
          </p>
          <button
            onClick={openLocationSettings}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition duration-300 py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/15"
          >
            Turn On Location / Reload
          </button>
        </div>
        {toastMessage && (
          <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08080a] text-white overflow-x-hidden relative">
      <Navbar />

      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            Nearby Food Joints
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
            Discover and sort food spots and restaurants around you. Calculations are updated in real-time.
          </p>
          <div className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 px-5 py-2.5 rounded-2xl">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-emerald-400">
              Tracking Area: <span className="underline">{userArea}</span>
            </span>
          </div>
        </section>

        {/* Side-by-side Map and List layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Column */}
          <div className="lg:col-span-7 xl:col-span-8">
            <MapView restaurants={restaurants} userLocation={userLocation} height="520px" />
          </div>

          {/* List Column */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {restaurants.map((res) => (
              <div
                key={res.id}
                onClick={() => setSelectedRestaurant(res)}
                className={`bg-white/[0.02] border rounded-[2rem] p-5 cursor-pointer hover:border-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between ${
                  selectedRestaurant?.id === res.id ? "border-orange-500/70 bg-white/[0.04]" : "border-white/[0.06]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold leading-tight">{res.name}</h2>
                    <span
                      className={`text-[9px] font-black px-2.5 py-1 rounded-full border ${
                        res.status === "Open"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{res.location}</p>
                </div>

                <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06]">
                  <span className="text-xs font-black text-emerald-400">
                    {res.calculatedDistance ? `${res.calculatedDistance.toFixed(1)} KM Away` : "Calculating..."}
                  </span>
                  <button
                    type="button"
                    className="bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white font-extrabold px-4 py-2 rounded-xl text-xs transition-colors duration-200 border border-orange-500/20"
                  >
                    Quick Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK PREVIEW MODAL */}
      {selectedRestaurant && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedRestaurant(null)}
        >
          <div
            className="bg-[#0e0e11] border border-white/[0.08] rounded-[2.5rem] max-w-md w-full p-6 overflow-hidden relative shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-black/55 backdrop-blur-md hover:bg-red-500/25 border border-white/10 hover:border-red-500/40 text-white transition-all duration-300 flex items-center justify-center"
            >
              <FaTimes className="text-sm" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
              <FaStore className="text-orange-500 text-2xl" />
            </div>

            <h2 className="text-2xl font-black mb-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {selectedRestaurant.name}
            </h2>

            <div className="space-y-3.5 mb-6">
              <p className="text-gray-300 flex items-center gap-3 text-sm">
                <FaMapMarkerAlt className="text-orange-500 text-sm flex-shrink-0" />
                <span>{selectedRestaurant.location}</span>
              </p>
              <p className="text-gray-300 flex items-center gap-3 text-sm">
                <FaClock className="text-orange-500 text-sm flex-shrink-0" />
                <span>Opens: {selectedRestaurant.openTime}</span>
              </p>
              <p className="text-gray-300 flex items-center gap-3 text-sm">
                <FaClock className="text-orange-500 text-sm flex-shrink-0" />
                <span>Closes: {selectedRestaurant.closeTime}</span>
              </p>
              <p className="text-gray-300 flex items-center gap-3 text-sm">
                <FaMotorcycle className="text-orange-500 text-sm flex-shrink-0" />
                <span>{selectedRestaurant.delivery}</span>
              </p>
              <p className="text-emerald-400 font-extrabold text-sm flex items-center gap-2">
                <FaLocationArrow className="text-xs" />
                <span>{selectedRestaurant.calculatedDistance?.toFixed(1)} KM Away</span>
              </p>
              <div className="pt-1.5">
                <span
                  className={`text-xs font-black px-3 py-1.5 rounded-full border ${
                    selectedRestaurant.status === "Open"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  }`}
                >
                  {selectedRestaurant.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={`https://wa.me/${selectedRestaurant.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
              >
                <FaWhatsapp className="text-sm" />
                WhatsApp
              </a>
              <a
                href={`https://www.google.com/maps?q=${selectedRestaurant.latitude},${selectedRestaurant.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
              >
                <FaDirections className="text-sm" />
                Directions
              </a>
            </div>

            <p className="text-gray-400 leading-relaxed text-xs">
              {selectedRestaurant.description}
            </p>
          </div>
        </div>
      )}

      {/* Render Toast notifications */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
}