import { cn } from "@/shared/lib/utils";
import React from "react";
import { CountIconButton } from "./count-icon-button";

export interface CountButtonProps {
  value?: number;
  loading?: boolean;
  size?: "sm" | "lg";
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  loading,
  onClick,
  value = 1,
  size = "sm",
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      <CountIconButton
        onClick={() => onClick?.("minus")}
        disabled={value === 1 || loading}
        size={size}
        type="minus"
      />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

      <CountIconButton
        onClick={() => onClick?.("plus")}
        disabled={loading}
        size={size}
        type="plus"
      />
    </div>
  );
};
