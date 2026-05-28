import Navbar from "@/components/Navbar";

import {
  FaMapMarkerAlt,
  FaClock,
  FaSearchLocation,
  FaUtensils,
  FaBell,
  FaMotorcycle,
  FaWhatsapp,
  FaDirections,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 sm:px-8 lg:px-12 text-center">

        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">

          <div className="inline-flex items-center gap-3 bg-[#111111] border border-orange-500 px-6 py-3 rounded-full mb-8">

            <FaUtensils className="text-orange-500" />

            <span className="text-sm sm:text-base font-medium">
              Smart Restaurant Tracking Platform
            </span>

          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8">

            About FoodTracker

          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-9 max-w-3xl mx-auto">

            FoodTracker helps users discover restaurants,
            track restaurant activities, explore menus,
            receive live notifications, and connect with
            restaurants easily from anywhere.

          </p>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* FEATURE 1 */}
          <div className="bg-[#111111] border border-gray-800 hover:border-orange-500 rounded-3xl p-8 transition duration-300 hover:-translate-y-2">

            <FaMapMarkerAlt className="text-orange-500 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Nearby Restaurants
            </h2>

            <p className="text-gray-400 leading-8">
              Find restaurants around your current location
              and explore food places near you instantly.
            </p>

          </div>

          {/* FEATURE 2 */}
          <div className="bg-[#111111] border border-gray-800 hover:border-orange-500 rounded-3xl p-8 transition duration-300 hover:-translate-y-2">

            <FaClock className="text-orange-500 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Live Open Status
            </h2>

            <p className="text-gray-400 leading-8">
              Restaurants automatically show whether
              they are currently open or closed in real time.
            </p>

          </div>

          {/* FEATURE 3 */}
          <div className="bg-[#111111] border border-gray-800 hover:border-orange-500 rounded-3xl p-8 transition duration-300 hover:-translate-y-2">

            <FaSearchLocation className="text-orange-500 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Smart Search
            </h2>

            <p className="text-gray-400 leading-8">
              Quickly discover restaurants, food courts,
              and local food places with ease.
            </p>

          </div>

          {/* FEATURE 4 */}
          <div className="bg-[#111111] border border-gray-800 hover:border-orange-500 rounded-3xl p-8 transition duration-300 hover:-translate-y-2">

            <FaBell className="text-orange-500 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Live Notifications
            </h2>

            <p className="text-gray-400 leading-8">
              Receive alerts when restaurants open,
              close, or start taking new orders.
            </p>

          </div>

          {/* FEATURE 5 */}
          <div className="bg-[#111111] border border-gray-800 hover:border-orange-500 rounded-3xl p-8 transition duration-300 hover:-translate-y-2">

            <FaMotorcycle className="text-orange-500 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Delivery Services
            </h2>

            <p className="text-gray-400 leading-8">
              View restaurants that offer delivery
              services directly to customers.
            </p>

          </div>

          {/* FEATURE 6 */}
          <div className="bg-[#111111] border border-gray-800 hover:border-orange-500 rounded-3xl p-8 transition duration-300 hover:-translate-y-2">

            <FaWhatsapp className="text-orange-500 text-5xl mb-6" />

            <h2 className="text-2xl font-bold mb-4">
              Quick Contact
            </h2>

            <p className="text-gray-400 leading-8">
              Contact restaurants directly through
              WhatsApp and access directions easily.
            </p>

          </div>

        </div>
      </section>

      {/* SYSTEM INFO */}
      <section className="px-6 sm:px-8 lg:px-12 pb-24">

        <div className="max-w-6xl mx-auto bg-[#111111] border border-gray-800 rounded-[40px] p-10 sm:p-14">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">

                Modern Restaurant Tracking Experience

              </h2>

              <p className="text-gray-400 leading-8 mb-8">

                FoodTracker is designed to make restaurant
                discovery simple, fast, and interactive.
                Users can explore restaurants, check menus,
                receive notifications, and connect with food
                vendors directly from one platform.

              </p>

              <div className="flex flex-wrap gap-4">

                <div className="bg-black border border-gray-800 px-5 py-3 rounded-2xl">
                  Real-Time Tracking
                </div>

                <div className="bg-black border border-gray-800 px-5 py-3 rounded-2xl">
                  Live Notifications
                </div>

                <div className="bg-black border border-gray-800 px-5 py-3 rounded-2xl">
                  Restaurant Menus
                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="bg-black border border-gray-800 rounded-3xl p-8">

              <div className="space-y-6">

                <div className="flex items-center justify-between border-b border-gray-800 pb-4">

                  <div className="flex items-center gap-3">

                    <FaDirections className="text-orange-500" />

                    <span>Restaurant Navigation</span>

                  </div>

                  <span className="text-green-500">
                    Active
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-gray-800 pb-4">

                  <div className="flex items-center gap-3">

                    <FaBell className="text-orange-500" />

                    <span>Notification System</span>

                  </div>

                  <span className="text-green-500">
                    Running
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-gray-800 pb-4">

                  <div className="flex items-center gap-3">

                    <FaUtensils className="text-orange-500" />

                    <span>Restaurant Menus</span>

                  </div>

                  <span className="text-green-500">
                    Enabled
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <FaMapMarkerAlt className="text-orange-500" />

                    <span>Nearby Detection</span>

                  </div>

                  <span className="text-green-500">
                    Online
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">

        © 2026 FoodTracker. All rights reserved.

      </footer>

    </main>
  );
}