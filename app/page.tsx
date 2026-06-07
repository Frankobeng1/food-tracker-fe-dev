import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 sm:px-8 lg:px-12 pt-32 pb-20 flex-1">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-5xl">
          Restaurant Tracking System
        </h1>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-8 max-w-2xl">
          Find nearby restaurants, explore locations, and track places around your area easily.
        </p>

        <Link href="/restaurants">
          <button className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-sm sm:text-base font-semibold transition duration-300">
            Explore Restaurants
          </button>
        </Link>
      </section>

      {/* Footer */}
<footer className="bg-black">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

          <div className="flex flex-col items-center text-center">

            {/* Brand */}
            <h2 className="text-xl font-bold text-white mb-4">
              Restaurant Tracker
            </h2>

            <p className="text-gray-400 leading-7 text-sm max-w-2xl mb-6">
              Discover nearby restaurants, explore locations,
              and find the best food places around your city.
            </p>

            {/* Location */}
            <p className="text-gray-400 flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-500" />
              Sunyani, Ghana
            </p>

          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
            © 2026 Restaurant Tracking System. All rights reserved.
          </div>

        </div>
      </footer>
    </main>
  );
}