import Navbar from "@/components/Navbar";
import Image from "next/image";

const restaurants = [
  {
    id: 1,
    name: "Sunyani Royal Restaurant",
    location: "Sunyani Central",
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
  },

  {
    id: 2,
    name: "African Pot",
    location: "Magazine Area",
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200",
  },

  {
    id: 3,
    name: "Sky View Restaurant",
    location: "Berlin Top",
    status: "Closed",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
  },

  {
    id: 4,
    name: "Sun City Food Court",
    location: "Sunyani Main Town",
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
  },
];

export default function RestaurantsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 px-6">

      {/* Navbar */}
      <Navbar />

      {/* Page Heading */}
      <section className="text-center mb-14">

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Sunyani Restaurants
        </h1>

        <p className="text-gray-400 text-lg">
          Discover restaurants around Sunyani
        </p>
      </section>

      {/* Restaurant Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500 transition duration-300"
          >

            {/* Image */}
            <div className="w-full h-56 relative">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>

            {/* Content */}
            <div className="p-5">

              <h2 className="text-2xl font-bold mb-3">
                {restaurant.name}
              </h2>

              <p className="text-gray-400 mb-2">
                 {restaurant.location}
              </p>

              <p
                className={`font-semibold mb-5 ${
                  restaurant.status === "Open"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {restaurant.status}
              </p>

              <button className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-3 rounded-lg font-semibold">
                View Restaurant
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}