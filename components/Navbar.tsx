"use client";

import Link from "next/link";
import {
  FaUtensils,
  FaBell,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

type NotificationType = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export default function Navbar() {
  const [unreadCount, setUnreadCount] =
    useState(0);

  // LOAD NOTIFICATIONS
  useEffect(() => {
    const updateUnreadCount = () => {
      const saved =
        localStorage.getItem(
          "notifications"
        );

      if (saved) {
        const notifications: NotificationType[] =
          JSON.parse(saved);

        const unread =
          notifications.filter(
            (notification) =>
              !notification.read
          ).length;

        setUnreadCount(unread);
      }
    };

    // INITIAL LOAD
    updateUnreadCount();

    // LIVE UPDATE
    window.addEventListener(
      "storage",
      updateUnreadCount
    );

    // AUTO REFRESH
    const interval =
      setInterval(() => {
        updateUnreadCount();
      }, 1000);

    return () => {
      window.removeEventListener(
        "storage",
        updateUnreadCount
      );

      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white border-b border-gray-800 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <FaUtensils className="text-orange-500 text-2xl" />

          <h1 className="text-xl sm:text-2xl font-bold">
            FoodTracker
          </h1>

        </Link>

        {/* NAV LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base">

          <Link
            href="/"
            className="hover:text-orange-500 transition duration-300"
          >
            Home
          </Link>

          <Link
            href="/restaurants"
            prefetch={false}
            className="hover:text-orange-500 transition duration-300"
          >
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

          {/* NOTIFICATIONS */}
          <Link
            href="/notifications"
            className="relative hover:text-orange-500 transition duration-300"
          >

            <FaBell className="text-xl" />

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center font-bold">

                {unreadCount}

              </span>
            )}

          </Link>

        </div>
      </div>
    </nav>
  );
} 