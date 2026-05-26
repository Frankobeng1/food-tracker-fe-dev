import Navbar from "@/components/Navbar";
import { FaMapMarkerAlt, FaClock, FaSearchLocation } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center px-6 py-20">
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About Our System
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-8">
          Restaurant Tracker helps users discover nearby restaurants,
          track locations, view restaurant information, and explore
          places around their area easily and quickly.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-20 max-w-7xl mx-auto">

        {/* Card 1 */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition duration-300">
          
          <FaMapMarkerAlt className="text-orange-500 text-5xl mb-6" />

          <h2 className="text-2xl font-bold mb-4">
            Live Location
          </h2>

          <p className="text-gray-400 leading-7">
            Track nearby restaurants using your current location
            in real time.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition duration-300">
          
          <FaClock className="text-orange-500 text-5xl mb-6" />

          <h2 className="text-2xl font-bold mb-4">
            Opening Hours
          </h2>

          <p className="text-gray-400 leading-7">
            View restaurant opening and closing times before visiting.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition duration-300">
          
          <FaSearchLocation className="text-orange-500 text-5xl mb-6" />

          <h2 className="text-2xl font-bold mb-4">
            Smart Search
          </h2>

          <p className="text-gray-400 leading-7">
            Easily search and discover restaurants around your area.
          </p>
        </div>
      </section>
    </main>
  );
}