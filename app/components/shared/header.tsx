"use client";

import { cn } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "./container";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modal";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Script from "next/script";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("verified")) {
      setTimeout(() => {
        toast.success(`Email has been successfully activated.`);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <header className={cn(" border-b", className)}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&loading=async`}
        async
        defer
        strategy="beforeInteractive"
        onError={e => {
          console.error("Google Maps script failed to load:", e);
        }}
      />
      <Container className="flex items-center justify-between py-8">
        {/* left */}
        <Link href="/">
          <div className="flex item-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-bold">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                it couldn&apos;t be tastier
              </p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Rigth */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
