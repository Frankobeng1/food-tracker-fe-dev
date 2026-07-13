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
    <main className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden relative">
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/30 px-5 py-2 rounded-full mb-8">
            <FaUtensils className="text-orange-500 text-sm" />
            <span className="text-xs sm:text-sm font-bold text-orange-400 uppercase tracking-wider">
              Smart Tracking Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-8 text-text-primary">
            About FoodTracker
          </h1>

          <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            FoodTracker bridges the gap between hungry users and local diners. We calculate operating states, map exact walking/driving distances, organize digital menus, and provide direct WhatsApp chat triggers.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FaMapMarkerAlt className="text-orange-500 text-3xl" />,
              title: "Nearby Food Joints",
              desc: "Locate food spaces around your current latitude/longitude instantly. Arranged dynamically by distance.",
            },
            {
              icon: <FaClock className="text-orange-500 text-3xl" />,
              title: "Live Open Status",
              desc: "Food joints automatically display operational states based on timezone calculations.",
            },
            {
              icon: <FaSearchLocation className="text-orange-500 text-3xl" />,
              title: "Smart Search & Tags",
              desc: "Discover dining spots by name, cuisine tag, or locations via smart matching controls.",
            },
            {
              icon: <FaBell className="text-orange-500 text-3xl" />,
              title: "Live System Alerts",
              desc: "Track operating windows and receive updates when ordering opens or closing approaches.",
            },
            {
              icon: <FaMotorcycle className="text-orange-500 text-3xl" />,
              title: "Delivery Flags",
              desc: "Quickly identify which spaces support home delivery options directly to your doorstep.",
            },
            {
              icon: <FaWhatsapp className="text-orange-500 text-3xl" />,
              title: "Direct Connects",
              desc: "Initiate direct food orders on WhatsApp or request navigation vectors to coordinates.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-bg-secondary border border-border-custom hover:border-orange-500/30 rounded-[2rem] p-8 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                {item.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM INFO */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 w-full">
        <div className="max-w-6xl mx-auto bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 sm:p-14 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                Modern Food Joint Tracking Architecture
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
                FoodTracker is architected as a lightweight, zero-latency index. We use modern geolocation, Leaflet maps overlays, local storage states, and dynamic status computation loops to ensure you always have access to up-to-date data.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="bg-bg-primary border border-border-custom text-text-secondary px-4 py-2.5 rounded-xl text-xs font-bold">
                  Client-side Geolocation
                </span>
                <span className="bg-bg-primary border border-border-custom text-text-secondary px-4 py-2.5 rounded-xl text-xs font-bold">
                  Dynamic Distance Calculations
                </span>
                <span className="bg-bg-primary border border-border-custom text-text-secondary px-4 py-2.5 rounded-xl text-xs font-bold">
                  Next.js App Router
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-bg-primary border border-border-custom rounded-[2rem] p-8">
              <div className="space-y-6">
                {[
                  { label: "Restaurant Navigation", value: "Active", icon: <FaDirections className="text-orange-500" /> },
                  { label: "Notification Loops", value: "Running", icon: <FaBell className="text-orange-500" /> },
                  { label: "Menu Indexing Services", value: "Enabled", icon: <FaUtensils className="text-orange-500" /> },
                  { label: "Nearby Map Overlays", value: "Online", icon: <FaMapMarkerAlt className="text-orange-500" /> },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-border-custom last:border-none pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      {row.icon}
                      <span className="text-sm font-semibold text-text-primary">{row.label}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}