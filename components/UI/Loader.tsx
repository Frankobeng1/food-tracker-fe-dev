"use client";

import { FaUtensils } from "react-icons/fa";

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({ message = "Loading...", fullScreen = true }: LoaderProps) {
  const containerClass = fullScreen
    ? "fixed inset-0 bg-[#08080a]/90 backdrop-blur-md z-50 flex flex-col justify-center items-center"
    : "w-full py-12 flex flex-col justify-center items-center";

  return (
    <div className={containerClass}>
      {/* Outer spinning glow ring */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin duration-1000"></div>
        <div className="absolute inset-2 rounded-full border-4 border-b-amber-500 border-t-transparent border-r-transparent border-l-transparent animate-spin duration-700 reverse"></div>
        
        {/* Inner pulsing icon */}
        <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 animate-pulse">
          <FaUtensils className="text-lg" />
        </div>
      </div>

      <h3 className="mt-6 text-lg font-black tracking-tight text-white/95">
        Food<span className="text-orange-500">Tracker</span>
      </h3>
      <p className="mt-2 text-sm text-gray-500 font-medium animate-pulse">{message}</p>
    </div>
  );
}
