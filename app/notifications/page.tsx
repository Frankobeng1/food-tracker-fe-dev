"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import {
  FaBell,
  FaCheckCircle,
  FaClock,
  FaStore,
  FaTrash,
} from "react-icons/fa";

// RESTAURANTS
const restaurants = [
  {
    id: 1,
    name: "Sunyani Royal Restaurant",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
  },

  {
    id: 2,
    name: "African Pot",
    openTime: "9:00 AM",
    closeTime: "11:00 PM",
  },

  {
    id: 3,
    name: "Sky View Restaurant",
    openTime: "10:00 AM",
    closeTime: "9:00 PM",
  },

  {
    id: 4,
    name: "Sun City Food Court",
    openTime: "7:00 AM",
    closeTime: "12:00 AM",
  },
];

// TYPES
type NotificationType = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

// TIME CONVERTER
const convertTo24Hour = (time: string) => {
  const [hourMinute, modifier] =
    time.split(" ");

  const [hourStr, minuteStr] =
    hourMinute.split(":");

  let hours = Number(hourStr);

  const minutes = Number(minuteStr);

  if (
    modifier === "PM" &&
    hours !== 12
  ) {
    hours += 12;
  }

  if (
    modifier === "AM" &&
    hours === 12
  ) {
    hours = 0;
  }

  return { hours, minutes };
};

// STATUS
const getRestaurantStatus = (
  openTime: string,
  closeTime: string
) => {
  const now = new Date();

  const open =
    convertTo24Hour(openTime);

  const close =
    convertTo24Hour(closeTime);

  const openDate = new Date(now);

  openDate.setHours(
    open.hours,
    open.minutes,
    0,
    0
  );

  const closeDate = new Date(now);

  closeDate.setHours(
    close.hours,
    close.minutes,
    0,
    0
  );

  if (close.hours < open.hours) {
    closeDate.setDate(
      closeDate.getDate() + 1
    );
  }

  return now >= openDate &&
    now <= closeDate
    ? "Open"
    : "Closed";
};

const getInitialNotifications = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = localStorage.getItem(
    "notifications"
  );

  return saved ? JSON.parse(saved) : [];
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationType[]>(
      getInitialNotifications
    );

  // SAVE STORAGE
  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // BROWSER NOTIFICATION
  const sendBrowserNotification = (
    title: string,
    body: string
  ) => {
    if (
      "Notification" in window &&
      Notification.permission ===
        "granted"
    ) {
      new Notification(title, {
        body,
      });
    }
  };

  // MARK AS READ
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  // DELETE
  const deleteNotification = (
    id: number
  ) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.id !== id
      )
    );
  };

  // GENERATE NOTIFICATIONS
  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission !==
        "granted"
    ) {
      Notification.requestPermission();
    }

    const generateNotifications =
      () => {
        const now = new Date();

        restaurants.forEach(
          (restaurant) => {
            const status =
              getRestaurantStatus(
                restaurant.openTime,
                restaurant.closeTime
              );

            const open =
              convertTo24Hour(
                restaurant.openTime
              );

            const close =
              convertTo24Hour(
                restaurant.closeTime
              );

            const openDate =
              new Date(now);

            openDate.setHours(
              open.hours,
              open.minutes,
              0,
              0
            );

            const closeDate =
              new Date(now);

            closeDate.setHours(
              close.hours,
              close.minutes,
              0,
              0
            );

            if (
              close.hours <
              open.hours
            ) {
              closeDate.setDate(
                closeDate.getDate() +
                  1
              );
            }

            const openMinutes =
              Math.floor(
                (openDate.getTime() -
                  now.getTime()) /
                  60000
              );

            const closeMinutes =
              Math.floor(
                (closeDate.getTime() -
                  now.getTime()) /
                  60000
              );

            const createNotification =
              (
                uniqueId: string,
                title: string,
                message: string
              ) => {
                setNotifications(
                  (prev) => {
                    const exists =
                      prev.find(
                        (n) =>
                          n.id.toString() ===
                          uniqueId
                      );

                    if (exists)
                      return prev;

                    sendBrowserNotification(
                      title,
                      message
                    );

                    return [
                      {
                        id: Number(
                          uniqueId
                        ),
                        title,
                        message,
                        time:
                          now.toLocaleTimeString(),
                        read: false,
                      },
                      ...prev,
                    ];
                  }
                );
              };

            // OPEN
            if (status === "Open") {
              createNotification(
                `${restaurant.id}1`,
                `${restaurant.name} is Open`,
                "Restaurant is now taking orders."
              );
            }

            // CLOSED
            if (
              status === "Closed"
            ) {
              createNotification(
                `${restaurant.id}2`,
                `${restaurant.name} is Closed`,
                "Restaurant is currently closed."
              );
            }

            // 30 MIN BEFORE OPEN
            if (
              openMinutes > 0 &&
              openMinutes <= 30
            ) {
              createNotification(
                `${restaurant.id}3`,
                `${restaurant.name} Opening Soon`,
                `Restaurant will open in ${openMinutes} minutes.`
              );
            }

            // 30 MIN BEFORE CLOSE
            if (
              closeMinutes > 0 &&
              closeMinutes <= 30
            ) {
              createNotification(
                `${restaurant.id}4`,
                `${restaurant.name} Closing Soon`,
                `Restaurant will close in ${closeMinutes} minutes.`
              );
            }

            // EVERY 3 HOURS
            if (
              status === "Open" &&
              now.getHours() % 3 ===
                0 &&
              now.getMinutes() ===
                0
            ) {
              createNotification(
                `${restaurant.id}5${now.getHours()}`,
                `${restaurant.name} Taking Orders`,
                "Restaurant is available and taking orders now."
              );
            }
          }
        );
      };

    generateNotifications();

    const interval =
      setInterval(() => {
        generateNotifications();
      }, 60000);

    return () =>
      clearInterval(interval);
  }, []);

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold mb-2">
              Notifications
            </h1>

            <p className="text-gray-400">
              Restaurant live updates.
            </p>

          </div>

          <div className="relative">

            <FaBell className="text-3xl text-orange-500" />

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}

          </div>
        </div>

        {/* LIST */}
        <div className="space-y-5">

          {notifications.length ===
          0 ? (
            <div className="bg-[#111111] border border-gray-800 rounded-3xl p-10 text-center">

              <FaBell className="text-5xl text-gray-600 mx-auto mb-5" />

              <h2 className="text-2xl font-bold mb-3">
                No Notifications
              </h2>

            </div>
          ) : (
            notifications.map(
              (notification) => (

                <div
                  key={
                    notification.id
                  }
                  className={`border rounded-3xl p-5 ${
                    notification.read
                      ? "border-gray-800 bg-[#111111]"
                      : "border-orange-500 bg-[#181818]"
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex-1">

                      <div className="flex items-center gap-3 mb-3">

                        <FaStore className="text-orange-500" />

                        <h2 className="text-lg font-semibold">
                          {
                            notification.title
                          }
                        </h2>

                      </div>

                      <p className="text-gray-400 text-sm mb-4">
                        {
                          notification.message
                        }
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-500">

                        <FaClock />

                        {
                          notification.time
                        }

                      </div>

                    </div>

                    <div className="flex flex-col gap-3">

                      {!notification.read && (
                        <button
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
                        >

                          <FaCheckCircle />

                          Read

                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
                      >

                        <FaTrash />

                        Delete

                      </button>

                    </div>

                  </div>
                </div>
              )
            )
          )}

        </div>
      </div>
    </main>
  );
}