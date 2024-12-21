"use client";

import React, { useState } from "react";
import Script from "next/script";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface Props {
  onChange?: (value: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // componentRestrictions: { country: "ua" }, // Ограничение поиска Украиной
    },
  });

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setShowSuggestions(false);
    onChange?.(address);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log("Coordinates:", { lat, lng });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowSuggestions(true);
    onChange?.(e.target.value);
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
        onError={e => {
          console.error("Google Maps script failed to load:", e);
        }}
      />
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          disabled={!ready}
          placeholder="Address"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        {showSuggestions && status === "OK" && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              margin: 0,
              padding: "8px",
              listStyleType: "none",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
