import type { Metadata } from "next";
import { Header } from "@/components/shared/header";

export const metadata: Metadata = {
  title: "🍕 Pizza Next - Freshly Baked Pizza Delivery 🍕",
  description:
    "Order delicious, freshly baked pizza with a variety of toppings! Fast delivery and great deals every day. Perfect for pizza lovers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
