"use client";

import { useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = "info", onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getStyle = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30",
          text: "text-emerald-400",
          icon: <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
        };
      case "error":
        return {
          bg: "bg-rose-500/10 border-rose-500/30",
          text: "text-rose-400",
          icon: <FaExclamationTriangle className="text-rose-500 text-lg flex-shrink-0" />
        };
      case "warning":
        return {
          bg: "bg-amber-500/10 border-amber-500/30",
          text: "text-amber-400",
          icon: <FaExclamationTriangle className="text-amber-500 text-lg flex-shrink-0" />
        };
      case "info":
      default:
        return {
          bg: "bg-blue-500/10 border-blue-500/30",
          text: "text-blue-400",
          icon: <FaInfoCircle className="text-blue-500 text-lg flex-shrink-0" />
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md shadow-2xl animate-fade-in-up max-w-sm ${style.bg}`}>
      {style.icon}
      <p className={`text-sm font-medium leading-5 ${style.text}`}>{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors duration-200 ml-2"
        aria-label="Close notification"
      >
        <FaTimes className="text-xs" />
      </button>
    </div>
  );
}
