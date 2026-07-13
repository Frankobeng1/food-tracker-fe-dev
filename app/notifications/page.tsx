"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { NotificationType } from "@/types/place";
import { restaurants } from "@/lib/data/restaurants";
import {
  FaBell,
  FaCheckCircle,
  FaClock,
  FaStore,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";

// Time converter utility
const convertTo24Hour = (time: string) => {
  const [hourMinute, modifier] = time.split(" ");
  const [hourStr, minuteStr] = hourMinute.split(":");
  let hours = Number(hourStr);
  const minutes = Number(minuteStr);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
};

// Check Open/Closed Status
const getRestaurantStatus = (openTime: string, closeTime: string) => {
  const now = new Date();
  const open = convertTo24Hour(openTime);
  const close = convertTo24Hour(closeTime);

  const openDate = new Date(now);
  openDate.setHours(open.hours, open.minutes, 0, 0);

  const closeDate = new Date(now);
  closeDate.setHours(close.hours, close.minutes, 0, 0);

  if (close.hours < open.hours) {
    closeDate.setDate(closeDate.getDate() + 1);
  }

  return now >= openDate && now <= closeDate ? "Open" : "Closed";
};

const getInitialNotifications = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>(getInitialNotifications);

  // Sync to LocalStorage and trigger Navbar update
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("notificationsUpdated"));
    }
  }, [notifications]);

  // Push notification through browser
  const sendBrowserNotification = (title: string, body: string) => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(title, { body });
    }
  };

  // Mark single as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  // Delete single
  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Simulation loop to generate notifications
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const generateNotifications = () => {
      const now = new Date();

      restaurants.forEach((restaurant) => {
        const status = getRestaurantStatus(restaurant.openTime, restaurant.closeTime);
        const open = convertTo24Hour(restaurant.openTime);
        const close = convertTo24Hour(restaurant.closeTime);

        const openDate = new Date(now);
        openDate.setHours(open.hours, open.minutes, 0, 0);

        const closeDate = new Date(now);
        closeDate.setHours(close.hours, close.minutes, 0, 0);

        if (close.hours < open.hours) {
          closeDate.setDate(closeDate.getDate() + 1);
        }

        const openMinutes = Math.floor((openDate.getTime() - now.getTime()) / 60000);
        const closeMinutes = Math.floor((closeDate.getTime() - now.getTime()) / 60000);

        const createNotification = (uniqueId: string, title: string, message: string) => {
          setNotifications((prev) => {
            const exists = prev.find((n) => n.id.toString() === uniqueId);
            if (exists) return prev;

            sendBrowserNotification(title, message);

            return [
              {
                id: Number(uniqueId),
                title,
                message,
                time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                read: false,
              },
              ...prev,
            ];
          });
        };

        // Open status notification
        if (status === "Open") {
          createNotification(
            `${restaurant.id}1`,
            `${restaurant.name} is Open`,
            "We are open and taking orders now!"
          );
        }

        // Closed status notification
        if (status === "Closed") {
          createNotification(
            `${restaurant.id}2`,
            `${restaurant.name} is Closed`,
            "We are currently closed. Check back tomorrow!"
          );
        }

        // Opening soon check
        if (openMinutes > 0 && openMinutes <= 30) {
          createNotification(
            `${restaurant.id}3`,
            `${restaurant.name} Opening Soon`,
            `Get ready! We open in ${openMinutes} minutes.`
          );
        }

        // Closing soon check
        if (closeMinutes > 0 && closeMinutes <= 30) {
          createNotification(
            `${restaurant.id}4`,
            `${restaurant.name} Closing Soon`,
            `Hurry! Last orders are being taken. Closing in ${closeMinutes} minutes.`
          );
        }
      });
    };

    generateNotifications();
    const interval = setInterval(generateNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="min-h-screen bg-[#08080a] text-white overflow-x-hidden relative">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Navbar />

      <div className="pt-36 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/[0.06]">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
              <FaBell className="text-orange-500" />
              Notifications
            </h1>
            <p className="text-gray-400 text-sm">
              Live opening times and operational announcements from tracked food joints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:text-orange-400 rounded-xl text-xs font-bold transition-all duration-300"
                  >
                    Mark All Read
                  </button>
                )}
                <button
                  onClick={clearAllNotifications}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5"
                >
                  <FaTrashAlt className="text-[10px]" />
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* List items */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mx-auto mb-6 text-gray-500">
                <FaBell className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold mb-2">All Caught Up!</h2>
              <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                No active updates right now. Notifications will appear here when food joint open slots shift.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`border rounded-3xl p-5 backdrop-blur-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 ${
                  notif.read
                    ? "border-white/[0.06] bg-white/[0.01] opacity-75"
                    : "border-orange-500/30 bg-orange-500/[0.02] shadow-lg shadow-orange-500/[0.01]"
                }`}
              >
                <div className="flex-1 flex gap-4 items-start">
                  <div className={`p-3 rounded-2xl border flex-shrink-0 mt-0.5 ${
                    notif.read ? "bg-white/[0.03] border-white/[0.05] text-gray-500" : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                  }`}>
                    <FaStore className="text-lg" />
                  </div>
                  <div>
                    <h2 className={`font-bold text-base sm:text-lg mb-1 ${notif.read ? "text-gray-300" : "text-white"}`}>
                      {notif.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">{notif.message}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaClock className="text-[10px]" />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto border-t md:border-none pt-3 md:pt-0">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="flex-1 md:flex-none bg-emerald-600/10 border border-emerald-500/20 hover:bg-emerald-600 text-emerald-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/5 hover:scale-102"
                    >
                      <FaCheckCircle />
                      Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="flex-1 md:flex-none bg-white/[0.03] border border-white/[0.06] hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}