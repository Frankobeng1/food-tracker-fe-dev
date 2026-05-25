"use client";

import Navbar from "@/components/Navbar";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";

const nearbyRestaurants = [
  {
    id: 1,
    name: "Sunyani Royal Restaurant",
    location: "Sunyani Central",
    distance: "1.2 KM Away",
    
  },

  {
    id: 2,
    name: "African Pot",
    location: "Magazine Area",
    distance: "2.5 KM Away",
   
  },

  {
    id: 3,
    name: "Sky View Restaurant",
    location: "Berlin Top",
    distance: "3.1 KM Away",
   
  },

  {
    id: 4,
    name: "Sun City Food Court",
    location: "Sunyani Main Town",
    distance: "4.0 KM Away",
    
  },
];

export default function NearbyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 px-6">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center mb-16">

        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 p-5 rounded-full">
            <FaLocationArrow className="text-4xl text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Nearby Restaurants
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover restaurants around your current location and
          explore the nearest places to eat in Sunyani.
        </p>
      </section>

      {/* Search Box UI */}
      <section className="max-w-3xl mx-auto mb-16">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search nearby restaurant..."
            className="flex-1 bg-black border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          />

          <button className="bg-orange-500 hover:bg-orange-600 transition duration-300 px-8 py-4 rounded-xl font-semibold">
            Find Nearby
          </button>

        </div>
      </section>

      {/* Restaurant Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {nearbyRestaurants.map((restaurant) => (

          <div
            key={restaurant.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 transition duration-300"
          >

         

            {/* Content */}
            <div className="p-6">

              <div className="flex items-center gap-3 mb-4">

                <FaMapMarkerAlt className="text-orange-500 text-2xl" />

                <h2 className="text-2xl font-bold">
                  {restaurant.name}
                </h2>

              </div>

              <p className="text-gray-400 mb-3">
                 {restaurant.location}
              </p>

              <p className="text-green-500 font-semibold text-lg mb-6">
                {restaurant.distance}
              </p>

              <button className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-3 rounded-xl font-semibold">
                View Restaurant
              </button>

            </div>

          </div>

        ))}

      </section>

    </main>
  );
}