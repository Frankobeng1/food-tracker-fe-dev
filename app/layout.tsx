import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodTracker - Local Food Joints",
  description: "Find nearby local food joints, menus, directions, and delivery services.",
};

import Footer from "@/components/Footer";
import PreloaderWrapper from "@/components/UI/PreloaderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PreloaderWrapper>
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          <Footer />
        </PreloaderWrapper>
      </body>
    </html>
  );
}
