import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt, FaClock, FaArrowRight, FaBell, FaUtensils, FaMap, FaStar } from "react-icons/fa";
import { restaurants } from "@/lib/data/restaurants";

export default function HomePage() {
  // Select top 3 restaurants as featured
  const featuredRestaurants = restaurants.slice(0, 3);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col overflow-x-hidden relative">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[60vh] right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 text-center relative z-10 flex flex-col items-center">
        {/* Banner Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 px-5 py-2.5 rounded-full mb-8 animate-fade-in">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold text-orange-400 tracking-wide uppercase">
            Live Food Joint Tracking active
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight max-w-5xl mb-6 text-text-primary">
          Track, Discover, and Order from Local Food Joints
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
          Experience real-time food joint status updates, live notifications, distance tracking, and direct contact details for the best dining options around you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link href="/restaurants">
            <button className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold px-8 py-4.5 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-102 active:scale-98 transition-all duration-300 flex items-center gap-3 text-base cursor-pointer">
              Explore Food Joints
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
          <Link href="/nearby">
            <button className="bg-bg-secondary border border-border-custom hover:bg-bg-secondary/80 text-text-primary font-extrabold px-8 py-4.5 rounded-2xl transition-all duration-300 flex items-center gap-3 text-base cursor-pointer">
              <FaMapMarkerAlt className="text-orange-500" />
              Locate Nearby
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-bg-secondary border border-border-custom rounded-[2rem] p-8 backdrop-blur-xl">
          {[
            { value: "100%", label: "Realtime Tracking" },
            { value: "4+", label: "Areas Covered" },
            { value: "Live", label: "Status Open/Close" },
            { value: "Direct", label: "WhatsApp Ordering" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-text-secondary font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Advanced Food Tracking Features
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Everything you need to find the right food at the right time. No guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-bg-secondary border border-border-custom hover:border-orange-500/30 rounded-[2.5rem] p-8 hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-105 transition-transform">
              <FaMap className="text-orange-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Interactive Map</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Locate food joints on our beautiful, custom dark map. Visually track proximity to your current coordinates easily.
            </p>
          </div>

          <div className="bg-bg-secondary border border-border-custom hover:border-orange-500/30 rounded-[2.5rem] p-8 hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-105 transition-transform">
              <FaClock className="text-orange-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Status Check</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Know immediately if a food joint is open, closed, or opening soon. Realtime computations keep details up-to-date.
            </p>
          </div>

          <div className="bg-bg-secondary border border-border-custom hover:border-orange-500/30 rounded-[2.5rem] p-8 hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-105 transition-transform">
              <FaBell className="text-orange-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Notifications</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Get notified of opening and closing slots, special announcements, and order status directly inside your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full border-t border-border-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Featured Food Places
            </h2>
            <p className="text-text-secondary max-w-xl text-sm sm:text-base">
              Handpicked top-rated food joints and restaurants with complete menu catalogs, WhatsApp connectivity, and maps.
            </p>
          </div>
          <Link href="/restaurants" className="text-orange-500 font-extrabold hover:text-orange-400 transition-colors flex items-center gap-2 text-sm sm:text-base whitespace-nowrap">
            View All Food Joints
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRestaurants.map((res) => (
            <div
              key={res.id}
              className="bg-bg-secondary border border-border-custom hover:border-orange-500/30 rounded-[2.2rem] overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={res.image}
                  alt={res.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {res.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase font-extrabold px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-orange-400 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-orange-400 transition-colors">
                      {res.name}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm line-clamp-2 mb-6 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-custom flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <FaMapMarkerAlt className="text-orange-500" />
                    <span>{res.location}</span>
                  </div>
                  <Link href={`/places/${res.id}`}>
                    <button className="bg-orange-500/10 hover:bg-orange-500 hover:text-white border border-orange-500/20 text-orange-400 font-extrabold px-4.5 py-2 rounded-xl text-xs transition-all duration-300 cursor-pointer">
                      View details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}