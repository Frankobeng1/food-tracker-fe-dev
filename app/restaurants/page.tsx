"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

import {
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
  FaWhatsapp,
  FaMotorcycle,
  FaDirections,
} from "react-icons/fa";

// AUTO OPEN/CLOSE DETECTION
const getRestaurantStatus = (
  openTime: string,
  closeTime: string
) => {
  const now = new Date();

  const convertTo24Hour = (time: string) => {
    const [hourMinute, modifier] = time.split(" ");

    const [hourStr, minuteStr] =
      hourMinute.split(":");

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

  const openDate = new Date(now);

  openDate.setHours(
    open.hours,
    open.minutes,
    0,
    0
  );

  const closeDate = new Date(now);

  closeDate.setHours(
    close.hours,
    close.minutes,
    0,
    0
  );

  // HANDLE MIDNIGHT
  if (close.hours < open.hours) {
    closeDate.setDate(
      closeDate.getDate() + 1
    );
  }

  return now >= openDate &&
    now <= closeDate
    ? "Open"
    : "Closed";
};

const restaurants = [
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

    description:
      "A modern restaurant offering local and continental dishes with a relaxing atmosphere.",

    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
  },

  {
    id: 2,

    name: "African Pot",

    location: "Magazine Area",

    openTime: "9:00 AM",

    closeTime: "11:00 PM",

    whatsapp: "233559815564",

    delivery: "Delivery Available",

    latitude: 7.3362,

    longitude: -2.3125,

    description:
      "Popular for traditional Ghanaian meals and affordable food services.",

    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200",
  },

  {
    id: 3,

    name: "Sky View Restaurant",

    location: "Berlin Top",

    openTime: "10:00 AM",

    closeTime: "9:00 PM",

    whatsapp: "233551924746",

    delivery: "No Delivery",

    latitude: 7.3451,

    longitude: -2.3189,

    description:
      "A rooftop restaurant with beautiful city views and delicious meals.",

    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
  },

  {
    id: 4,

    name: "Sun City Food Court",

    location: "Sunyani Main Town",

    openTime: "7:00 AM",

    closeTime: "12:00 AM",

    whatsapp: "233274445555",

    delivery: "Delivery Available",

    latitude: 7.3348,

    longitude: -2.3154,

    description:
      "A food court with multiple food vendors and fast-food services.",

    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
  },
];

type Restaurant = (typeof restaurants)[number] & {
  status?: string;
};

export default function RestaurantsPage() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const [restaurantData, setRestaurantData] =
    useState<Restaurant[]>([]);

  // AUTO UPDATE OPEN/CLOSE STATUS
  useEffect(() => {
    const updateRestaurantStatus = () => {
      const updatedRestaurants =
        restaurants.map((restaurant) => ({
          ...restaurant,

          status:
            getRestaurantStatus(
              restaurant.openTime,
              restaurant.closeTime
            ),
        }));

      setRestaurantData(updatedRestaurants);
    };

    // RUN IMMEDIATELY
    updateRestaurantStatus();

    // UPDATE EVERY 1 MINUTE
    const interval =
      setInterval(() => {
        updateRestaurantStatus();
      }, 60000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      <Navbar />

      <div className="pt-32 pb-24 px-5 sm:px-8 lg:px-12">

        {/* HERO */}
        <section className="text-center mb-16">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 tracking-tight">
            Restaurants
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-8">
            Explore amazing restaurants around Sunyani.
          </p>

        </section>

        {/* RESTAURANTS */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">

          {restaurantData.map(
            (restaurant) => (

              <div
                key={restaurant.id}
                className="bg-[#111111] border border-gray-800 rounded-3xl overflow-hidden hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg"
              >

                {/* IMAGE */}
                <div className="relative w-full h-64 overflow-hidden">

                  <Image
                    src={
                      restaurant.image
                    }
                    alt={
                      restaurant.name
                    }
                    fill
                    className="object-cover hover:scale-110 transition duration-500"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    {restaurant.name}
                  </h2>

                  <div className="space-y-3 mb-6">

                    <p className="text-gray-400 flex items-center gap-3 text-sm">

                      <FaMapMarkerAlt className="text-orange-500" />

                      {
                        restaurant.location
                      }

                    </p>

                    <p
                      className={`font-semibold text-sm ${
                        restaurant.status ===
                        "Open"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {
                        restaurant.status
                      }
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setSelectedRestaurant(
                        restaurant
                      )
                    }
                    className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-3 rounded-2xl text-sm font-semibold"
                  >
                    View Restaurant
                  </button>

                </div>
              </div>
            )
          )}
        </section>
      </div>

      {/* MODAL */}
      {selectedRestaurant && (

        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={() =>
            setSelectedRestaurant(
              null
            )
          }
        >

          <div
            className="bg-[#111111] border border-gray-700 rounded-3xl max-w-md w-full overflow-hidden relative shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}
            <button
              onClick={() =>
                setSelectedRestaurant(
                  null
                )
              }
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-red-500 transition duration-300 flex items-center justify-center"
            >

              <FaTimes className="text-white text-sm" />

            </button>

            {/* IMAGE */}
            <div className="relative w-full h-52">

              <Image
                src={
                  selectedRestaurant.image
                }
                alt={
                  selectedRestaurant.name
                }
                fill
                className="object-cover"
              />

            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-2xl font-bold mb-5">
                {
                  selectedRestaurant.name
                }
              </h2>

              <div className="space-y-4 mb-6">

                <p className="text-gray-300 flex items-center gap-3 text-sm">

                  <FaMapMarkerAlt className="text-orange-500" />

                  {
                    selectedRestaurant.location
                  }

                </p>

                <p className="text-gray-300 flex items-center gap-3 text-sm">

                  <FaClock className="text-orange-500" />

                  Opens:{" "}
                  {
                    selectedRestaurant.openTime
                  }

                </p>

                <p className="text-gray-300 flex items-center gap-3 text-sm">

                  <FaClock className="text-orange-500" />

                  Closes:{" "}
                  {
                    selectedRestaurant.closeTime
                  }

                </p>

                <p className="text-gray-300 flex items-center gap-3 text-sm">

                  <FaMotorcycle className="text-orange-500" />

                  {
                    selectedRestaurant.delivery
                  }

                </p>

                <p
                  className={`font-semibold text-sm ${
                    selectedRestaurant.status ===
                    "Open"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {
                    selectedRestaurant.status
                  }
                </p>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mb-5">

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
                  href={`https://www.google.com/maps?q=${selectedRestaurant.latitude},${selectedRestaurant.longitude}`}
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

                {
                  selectedRestaurant.description
                }

              </p>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}