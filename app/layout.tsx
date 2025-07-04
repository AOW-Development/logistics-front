import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AOW Logistics - Order Tracking System",
  description: "Track your shipments in real-time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

import "./globals.css";
