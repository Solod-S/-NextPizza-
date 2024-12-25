"use client";
import { Container } from "@/app/components/shared";
import { useSearchParams } from "next/navigation";

import React, { useEffect, Suspense } from "react";
import toast from "react-hot-toast";

const CancelPageContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      setTimeout(() => {
        toast.error(
          `The payment for order #${orderId} was unsuccessful. Please try again.`
        );
      }, 500);
    }
  }, [orderId]);

  return (
    <Container className="flex flex-col my-10 items-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Error</h1>
      {orderId && (
        <p className="text-lg mt-4">
          Unfortunately, the payment for order <strong>#{orderId}</strong> was
          unsuccessful.
        </p>
      )}
      <p className="mt-2">
        Please try again or contact support if you continue to experience
        issues.
      </p>
    </Container>
  );
};

export default function CancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelPageContent />
    </Suspense>
  );
}
