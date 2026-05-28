"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaClock,
  FaTimes,
  FaWhatsapp,
  FaMotorcycle,
  FaDirections,
  FaBell,
} from "react-icons/fa";

const nearbyRestaurants = [
  {
    id: 1,
    name: "Sunyani Royal Restaurant",
    location: "Sunyani Central",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
    whatsapp: "233558627995",
    delivery: "Delivery Available",
    lat: 7.3399,
    lng: -2.3268,
    description:
      "A modern restaurant offering local and continental dishes with a relaxing atmosphere.",
  },

  {
    id: 2,
    name: "African Pot",
    location: "Magazine Area",
    openTime: "9:00 AM",
    closeTime: "11:00 PM",
    whatsapp: "233559815564",
    delivery: "Delivery Available",
    lat: 7.3365,
    lng: -2.315,
    description:
      "Popular for traditional Ghanaian meals and affordable food services.",
  },

  {
    id: 3,
    name: "Sky View Restaurant",
    location: "Berlin Top",
    openTime: "10:00 AM",
    closeTime: "9:00 PM",
    whatsapp: "233551924746",
    delivery: "No Delivery",
    lat: 7.3421,
    lng: -2.3012,
    description:
      "A rooftop restaurant with beautiful city views and delicious meals.",
  },

  {
    id: 4,
    name: "Sun City Food Court",
    location: "Sunyani Main Town",
    openTime: "7:00 AM",
    closeTime: "12:00 AM",
    whatsapp: "233274445555",
    delivery: "Delivery Available",
    lat: 7.335,
    lng: -2.32,
    description:
      "A food court with multiple food vendors and fast-food services.",
  },
];

type Restaurant = (typeof nearbyRestaurants)[number];

type RestaurantWithDistance = Restaurant & {
  calculatedDistance?: number;
  status?: string;
};

export default function NearbyPage() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantWithDistance | null>(null);

  const [userArea, setUserArea] = useState("Detecting...");
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [restaurants, setRestaurants] = useState<RestaurantWithDistance[]>(
    nearbyRestaurants
  );

  
useEffect(() => {
    let watchId: number | null = null;
    let locationGrantedAlerted = false;

    const calculateDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ) => {
      const R = 6371;

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

    const checkRestaurantStatus = (
      openTime: string,
      closeTime: string
    ) => {
      const now = new Date();

      const convertTo24Hour = (time: string) => {
        const [hourMinute, modifier] = time.split(" ");
        const [hourStr, minuteStr] = hourMinute.split(":");
        let hours = Number(hourStr);
        const minutes = Number(minuteStr);

        if (modifier === "PM" && hours !== 12) {
          hours += 12;
        }

        if (modifier === "AM" && hours === 12) {
          hours = 0;
        }

        return { hours, minutes };
      };

      const open = convertTo24Hour(openTime);
      const close = convertTo24Hour(closeTime);

      const openDate = new Date();
      openDate.setHours(open.hours, open.minutes, 0);

      const closeDate = new Date();
      closeDate.setHours(close.hours, close.minutes, 0);

      // HANDLE MIDNIGHT
      if (close.hours < open.hours) {
        closeDate.setDate(closeDate.getDate() + 1);
      }

      return now >= openDate && now <= closeDate
        ? "Open"
        : "Closed";
    };

    const sendNotification = (title: string, body: string) => {
      if (Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/favicon.ico",
        });
      }
    };

    const initLocation = async () => {
      // REQUEST NOTIFICATION PERMISSION
      if ("Notification" in window) {
        Notification.requestPermission();
      }

      if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
      }

      if ("permissions" in navigator) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation" as PermissionName,
          });

          if (permissionStatus.state === "granted") {
            alert("Location is ON. Fetching nearby restaurants now.");
          } else if (permissionStatus.state === "denied") {
            alert(
              "Location is OFF. Please enable location permission."
            );
          }
        } catch {
          // ignore permission query errors
        }
      }

      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          if (!locationGrantedAlerted) {
            alert("Location access granted. Loading restaurants.");
            locationGrantedAlerted = true;
          }

          setLocationAllowed(true);
          setLocationError(null);

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          
          // GET AREA NAME
          
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
            setUserArea("Location Found");
          }

      
          // SORT RESTAURANTS

          
          const sortedRestaurants = nearbyRestaurants
            .map((restaurant) => {
              const distance = calculateDistance(
                latitude,
                longitude,
                restaurant.lat,
                restaurant.lng
              );

              const currentStatus = checkRestaurantStatus(
                restaurant.openTime,
                restaurant.closeTime
              );

              // PUSH NOTIFICATION
              if (currentStatus === "Open") {
                sendNotification(
                  restaurant.name,
                  `${restaurant.name} is now OPEN`
                );
              }

              return {
                ...restaurant,
                calculatedDistance: distance,
                status: currentStatus,
              };
            })

            .sort(
              (a, b) =>
                (a.calculatedDistance || 0) -
                (b.calculatedDistance || 0)
            );

          setRestaurants(sortedRestaurants);
        },

        (error) => {
          console.log(error);

          setLocationAllowed(false);
          setLocationError("denied");

          if (error.code === 1) {
            alert("Please allow location access.");
          } else if (error.code === 2) {
            alert("Location unavailable. Turn on GPS.");
          } else if (error.code === 3) {
            alert("Location request timed out.");
          } else {
            alert("Unable to access location. Please enable GPS.");
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

  
  // OPEN SETTINGS
  
  const openLocationSettings = () => {
    alert(
      "Turn ON GPS and allow browser location permission."
    );

    window.open("chrome://settings/content/location");

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  
  // BLOCK SCREEN
  
  if (!locationAllowed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="bg-[#111111] border border-red-500 rounded-3xl p-10 max-w-md w-full text-center">

          <div className="flex justify-center mb-6">
            <div className="bg-red-500/20 p-5 rounded-full">
              <FaLocationArrow className="text-red-500 text-4xl" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">
            Location Access Needed
          </h1>

          <p className="text-gray-400 leading-7 mb-8">
            {locationError === "denied"
              ? "Location permission is denied. Turn on GPS and allow access to continue."
              : "Please turn on GPS and allow location permission."}
          </p>

          <button
            onClick={openLocationSettings}
            className="bg-orange-500 hover:bg-orange-600 transition duration-300 px-8 py-3 rounded-2xl font-semibold"
          >
            Turn On Location
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-32 pb-24 px-5 sm:px-8 lg:px-12">

        {/* HERO */}
        <section className="text-center mb-16">

          <div className="flex justify-center mb-7">
            <div className="bg-orange-500/10 border border-orange-500/30 p-5 rounded-full">
              <FaLocationArrow className="text-4xl text-orange-500" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 tracking-tight">
            Nearby Restaurants
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-8">
            Restaurants are automatically arranged based on your live location.
          </p>

          {/* USER AREA */}
          <div className="mt-8 inline-flex items-center gap-3 bg-[#111111] border border-green-500 px-6 py-3 rounded-2xl">

            <FaMapMarkerAlt className="text-green-500" />

            <span className="text-sm sm:text-base">
              You are currently in{" "}
              <span className="text-green-500 font-semibold">
                {userArea}
              </span>
            </span>

          </div>

        </section>

        {/* RESTAURANTS */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">

          {restaurants.map((restaurant) => (

            <div
              key={restaurant.id}
              className="bg-[#111111] border border-gray-800 rounded-3xl p-6 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg"
            >

              {/* HEADER */}
              <div className="flex items-start gap-4 mb-6">

                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-orange-500 text-2xl" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-2">
                    {restaurant.name}
                  </h2>

                  <p className="text-gray-400 text-sm sm:text-base">
                    {restaurant.location}
                  </p>
                </div>

              </div>

              {/* DISTANCE */}
              <div className="mb-3">

                <p className="text-green-500 font-semibold text-base">
                  {restaurant.calculatedDistance?.toFixed(1)} KM Away
                </p>

              </div>

              {/* STATUS */}
              <div className="mb-7 flex items-center gap-2">

                <FaBell
                  className={
                    restaurant.status === "Open"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />

                <p
                  className={`font-semibold ${
                    restaurant.status === "Open"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {restaurant.status}
                </p>

              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={() => setSelectedRestaurant(restaurant)}
                className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-3 rounded-2xl text-sm sm:text-base font-semibold"
              >
                View Restaurant
              </button>

            </div>
          ))}

        </section>
      </div>

      {/* MODAL */}
      {selectedRestaurant && (

        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedRestaurant(null)}
        >

          <div
            className="bg-[#111111] border border-gray-700 rounded-3xl max-w-md w-full overflow-hidden relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-red-500 transition duration-300 flex items-center justify-center"
            >
              <FaTimes className="text-white text-sm" />
            </button>

            {/* CONTENT */}
            <div className="p-6">

              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                <FaMapMarkerAlt className="text-orange-500 text-3xl" />
              </div>

              <h2 className="text-2xl font-bold mb-6">
                {selectedRestaurant.name}
              </h2>

              <div className="space-y-4 mb-6">

                <p className="text-gray-300 flex items-center gap-3 text-sm">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {selectedRestaurant.location}
                </p>

                <p className="text-gray-300 flex items-center gap-3 text-sm">
                  <FaClock className="text-orange-500" />
                  Opens: {selectedRestaurant.openTime}
                </p>

                <p className="text-gray-300 flex items-center gap-3 text-sm">
                  <FaClock className="text-orange-500" />
                  Closes: {selectedRestaurant.closeTime}
                </p>

                <p className="text-gray-300 flex items-center gap-3 text-sm">
                  <FaMotorcycle className="text-orange-500" />
                  {selectedRestaurant.delivery}
                </p>

                <p className="text-green-500 font-semibold text-sm">
                  {selectedRestaurant.calculatedDistance?.toFixed(1)} KM Away
                </p>

                <p
                  className={`font-semibold text-sm ${
                    selectedRestaurant.status === "Open"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {selectedRestaurant.status}
                </p>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mb-6">

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/${selectedRestaurant.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 transition duration-300 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>

                {/* DIRECTION */}
                <a
                  href={`https://www.google.com/maps?q=${selectedRestaurant.lat},${selectedRestaurant.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 transition duration-300 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <FaDirections />
                  Direction
                </a>

              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-400 leading-7 text-sm">
                {selectedRestaurant.description}
              </p>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}