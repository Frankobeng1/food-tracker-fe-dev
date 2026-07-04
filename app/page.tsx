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

      {/* Footer is now shared across all pages via RootLayout */}
    </main>
  );
}