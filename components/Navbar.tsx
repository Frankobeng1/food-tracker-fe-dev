"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell, FaUtensils } from "react-icons/fa";
import { NotificationType } from "@/types/place";

export default function Navbar() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkNotifications = () => {
      if (typeof window === "undefined") return;
      try {
        const saved = localStorage.getItem("notifications");
        if (saved) {
          const notifications: NotificationType[] = JSON.parse(saved);
          const count = notifications.filter((n) => !n.read).length;
          setUnreadCount(count);
        } else {
          setUnreadCount(0);
        }
      } catch (err) {
        console.error("Error reading notifications in Navbar:", err);
      }
    };

    // Initial check
    checkNotifications();

    // Listen for storage events (changes from other pages/tabs)
    window.addEventListener("storage", checkNotifications);

    // Listen for custom events within the same tab
    window.addEventListener("notificationsUpdated", checkNotifications);

    // Short polling fallback to ensure absolute sync
    const interval = setInterval(checkNotifications, 3000);

    return () => {
      window.removeEventListener("storage", checkNotifications);
      window.removeEventListener("notificationsUpdated", checkNotifications);
      clearInterval(interval);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a0a0c]/75 backdrop-blur-xl border-b border-white/[0.06] z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <FaUtensils className="text-white text-lg" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
            Food<span className="text-orange-500">Tracker</span>
          </h1>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden md:flex items-center gap-1">
            {[
              { name: "Home", path: "/" },
              { name: "Food Joints", path: "/restaurants" },
              { name: "Nearby", path: "/nearby" },
              { name: "About", path: "/about" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-orange-500 bg-orange-500/[0.06]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* MOBILE NAV LINKS (Simplified Row) */}
          <div className="flex md:hidden items-center gap-3">
            {[
              { name: "Home", path: "/" },
              { name: "Explore", path: "/restaurants" },
              { name: "Nearby", path: "/nearby" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-orange-500 bg-orange-500/[0.06]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* NOTIFICATION BUTTON - Disabled for v1
          <Link
            href="/notifications"
            className={`relative p-2.5 rounded-xl border transition-all duration-300 ${
              isActive("/notifications")
                ? "bg-orange-500/10 border-orange-500/30 text-orange-500 shadow-md"
                : "bg-white/[0.02] border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1]"
            }`}
            aria-label="View notifications"
          >
            <FaBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#0a0a0c] shadow-lg animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          */}
        </div>
      </div>
    </nav>
  );
}