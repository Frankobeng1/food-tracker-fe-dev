import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-6 min-h-[85vh]">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Restaurant Tracking System
        </h1>

        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl">
          Find nearby restaurants, explore locations, and track places around your area easily.
        </p>

        <button className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
          Explore Restaurants
        </button>
      </section>
    </main>
  );
}