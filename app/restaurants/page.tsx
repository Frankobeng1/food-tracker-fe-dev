"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
  FaWhatsapp,
  FaMotorcycle,
  FaDirections,
  FaUtensils,
  FaSearch,
  FaInfoCircle,
} from "react-icons/fa";
import { restaurants, Restaurant } from "@/lib/data/restaurants";

// Auto Open/Close Detection
const getRestaurantStatus = (openTime: string, closeTime: string) => {
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

  const openDate = new Date(now);
  openDate.setHours(open.hours, open.minutes, 0, 0);

  const closeDate = new Date(now);
  closeDate.setHours(close.hours, close.minutes, 0, 0);

  // Handle midnight open/close
  if (close.hours < open.hours) {
    closeDate.setDate(closeDate.getDate() + 1);
  }

  return now >= openDate && now <= closeDate ? "Open" : "Closed";
};

export default function RestaurantsPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Sync statuses on load and on interval
  useEffect(() => {
    const updateRestaurantStatus = () => {
      const updated = restaurants.map((res) => ({
        ...res,
        status: getRestaurantStatus(res.openTime, res.closeTime),
      }));
      setRestaurantData(updated);
    };

    updateRestaurantStatus();
    const interval = setInterval(updateRestaurantStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const categories = ["All", "Local", "Continental", "Fast Food", "Rooftop"];

  // Search & Filter computation
  const filteredRestaurants = restaurantData.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === "All" || res.tags.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden relative">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Navbar />

      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-black mb-5 tracking-tight text-text-primary">
            Explore Food Joints
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover catalog details, active operating hours, menu lists, and contact options. Filter by categories to find exactly what you crave.
          </p>
        </div>

        {/* Filters and Search controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-bg-secondary border border-border-custom p-6 rounded-[2rem] backdrop-blur-xl">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm" />
            <input
              type="text"
              placeholder="Search by name, location, food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-primary border border-border-custom hover:border-text-secondary focus:border-orange-500/50 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none transition-all duration-300 placeholder-text-secondary text-text-primary"
            />
          </div>

          {/* Tag buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "bg-bg-primary border-border-custom text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count info */}
        <div className="mb-8 text-sm text-text-secondary font-medium">
          Showing <span className="text-orange-500 font-bold">{filteredRestaurants.length}</span> food joint(s)
        </div>

        {/* Grid List */}
        {filteredRestaurants.length === 0 ? (
          <div className="bg-bg-secondary border border-border-custom rounded-[2.5rem] p-16 text-center">
            <FaUtensils className="text-5xl text-text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Food Joints Found</h3>
            <p className="text-text-secondary text-sm">Try tweaking your search query or choosing another category.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRestaurants.map((res) => (
              <div
                key={res.id}
                className="bg-bg-secondary border border-border-custom rounded-[2.2rem] overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-2 shadow-xl flex flex-col justify-between group h-full"
              >
                {/* Image & Tags header */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={res.image}
                    alt={res.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase font-black px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-orange-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status Overlay Float */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`text-[10px] font-black px-3.5 py-1.5 rounded-full border shadow-md backdrop-blur-md ${
                        res.status === "Open"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                      {res.name}
                    </h2>
                    <p className="text-text-secondary text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {res.description}
                    </p>

                    <div className="flex items-center gap-2.5 text-xs text-text-secondary mb-6">
                      <FaMapMarkerAlt className="text-orange-500 text-sm flex-shrink-0" />
                      <span>{res.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-custom">
                    <Link href={`/places/${res.id}`} className="w-full">
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10 hover:scale-102 cursor-pointer">
                        <FaInfoCircle />
                        Full Page
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedRestaurant(res);
                        setShowMenu(true);
                      }}
                      className="w-full bg-bg-primary border border-border-custom hover:bg-bg-secondary hover:border-orange-500/30 hover:text-orange-400 transition-all duration-300 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer text-text-primary"
                    >
                      <FaUtensils />
                      Menu List
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* QUICK PREVIEW MODAL */}
      {selectedRestaurant && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedRestaurant(null)}
        >
          <div
            className="bg-bg-secondary border border-border-custom rounded-[2.5rem] max-w-md w-full overflow-hidden relative shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-black/55 backdrop-blur-md hover:bg-red-500/25 border border-white/10 hover:border-red-500/40 text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Image Header */}
            <div className="relative w-full h-52">
              <Image
                src={selectedRestaurant.image}
                alt={selectedRestaurant.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent" />
            </div>

            {/* Modal Info content */}
            <div className="p-6 -mt-8 relative z-10">
              <h2 className="text-2xl font-black mb-4 text-text-primary">
                {selectedRestaurant.name}
              </h2>

              {/* Menu listings content */}
              {showMenu ? (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-bold flex items-center gap-2.5 text-orange-400">
                      <FaUtensils />
                      Menu List
                    </h3>
                    <button
                      onClick={() => setShowMenu(false)}
                      className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      Back to Info
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                    {selectedRestaurant.menu.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-bg-primary border border-border-custom rounded-xl px-4 py-3.5 hover:border-orange-500/20 transition-all duration-200"
                      >
                        <span className="font-semibold text-sm text-text-primary">{item.name}</span>
                        <span className="text-orange-400 font-extrabold text-sm">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    <p className="text-text-secondary flex items-center gap-3 text-sm">
                      <FaMapMarkerAlt className="text-orange-500 flex-shrink-0" />
                      <span>{selectedRestaurant.location}</span>
                    </p>
                    <p className="text-text-secondary flex items-center gap-3 text-sm">
                      <FaClock className="text-orange-500 flex-shrink-0" />
                      <span>Opens: {selectedRestaurant.openTime}</span>
                    </p>
                    <p className="text-text-secondary flex items-center gap-3 text-sm">
                      <FaClock className="text-orange-500 flex-shrink-0" />
                      <span>Closes: {selectedRestaurant.closeTime}</span>
                    </p>
                    <p className="text-text-secondary flex items-center gap-3 text-sm">
                      <FaMotorcycle className="text-orange-500 flex-shrink-0" />
                      <span>{selectedRestaurant.delivery}</span>
                    </p>
                    <div className="pt-2">
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                          selectedRestaurant.status === "Open"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        }`}
                      >
                        {selectedRestaurant.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex gap-3 mb-6">
                    <a
                      href={`https://wa.me/${selectedRestaurant.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white transition duration-300 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-extrabold shadow-md shadow-green-600/10"
                    >
                      <FaWhatsapp className="text-sm" />
                      WhatsApp Order
                    </a>
                    <a
                      href={`https://www.google.com/maps?q=${selectedRestaurant.latitude},${selectedRestaurant.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition duration-300 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-extrabold shadow-md shadow-blue-600/10"
                    >
                      <FaDirections className="text-sm" />
                      Get Directions
                    </a>
                  </div>

                  <p className="text-text-secondary leading-relaxed text-xs">
                    {selectedRestaurant.description}
                  </p>
                </>
              )}

              {/* View Full Page trigger */}
              <div className="mt-6 pt-4 border-t border-border-custom text-center">
                <Link href={`/places/${selectedRestaurant.id}`}>
                  <span className="text-xs font-bold text-orange-400 hover:text-orange-300 hover:underline cursor-pointer flex items-center justify-center gap-1.5">
                    Go to Food Joint Details Page &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}