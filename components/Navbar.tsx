"use client";

import Link from "next/link";
import { FaUtensils } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white border-b border-gray-800 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <FaUtensils className="text-orange-500 text-3xl" />

          <h1 className="text-2xl sm:text-3xl font-bold">
            FoodTracker
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-base sm:text-xl">

          <Link
            href="/"
            className="hover:text-orange-500 transition duration-300"
          >
            Home
          </Link>

         <Link href="/restaurants" prefetch={false}>
          Restaurants
</Link>
          <Link
            href="/nearby"
            className="hover:text-orange-500 transition duration-300"
          >
            Nearby
          </Link>

          <Link
            href="/about"
            className="hover:text-orange-500 transition duration-300"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}