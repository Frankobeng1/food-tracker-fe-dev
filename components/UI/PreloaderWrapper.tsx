"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth loader reveal timing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader message="Preparing your experience..." />}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
          loading ? "opacity-0 blur-sm pointer-events-none" : "opacity-100 blur-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
