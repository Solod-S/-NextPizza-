import type { Metadata } from "next";
import { Header } from "@/app/components/shared/header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "🍕 Pizza Next - Freshly Baked Pizza Delivery 🍕",
  description:
    "Order delicious, freshly baked pizza with a variety of toppings! Fast delivery and great deals every day. Perfect for pizza lovers!",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}

      {modal}
    </main>
  );
}
