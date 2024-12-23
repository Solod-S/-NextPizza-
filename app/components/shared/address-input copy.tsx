"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}
const daDataKey = process.env.NEXT_GOOGLE_PLACES_API_KEY as string;

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token={daDataKey}
      onChange={data => onChange?.(data?.value)}
    />
  );
};
