import { cn } from "@/shared/lib/utils";
import { User } from "lucide-react";
import React from "react";

import Image from "next/image";
import { Container } from "./container";
import { Button } from "../ui";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
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

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>
        {/* Rigth */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Auth
          </Button>

          <div>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
