"use client";
import { Container } from "@/app/components/shared";
import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const SuccessPageContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) {
      setTimeout(() => {
        toast.success(
          `The order #${orderId} has been successfully paid and the order information has been sent to your email.`
        );
      }, 500);
    }
  }, [searchParams]);

  return (
    <Container className="flex flex-col my-10 items-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      {orderId && (
        <p className="text-lg mt-4">
          Thank you for your payment! Your order <strong>#{orderId}</strong> has
          been processed successfully.
        </p>
      )}
      <p className="mt-2">You will receive an email confirmation shortly.</p>
    </Container>
  );
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
