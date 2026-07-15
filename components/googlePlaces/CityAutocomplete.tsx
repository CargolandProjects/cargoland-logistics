"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useDebounce } from "@//lib/hooks/useDebounce"; // adjust path if needed

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (place: google.maps.places.Place) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  countryCode?: string;
  className?: string;
  inputClassName?: string;
}

export function CityAutocomplete({
  value,
  onChange,
  onSelect,
  onFocus,
  onBlur,
  placeholder,
  readOnly = false,
  countryCode,
  className = "",
  inputClassName = "",
}: CityAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLibrary = useMapsLibrary("places");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Request cancellation: increment on each new request to ignore stale responses
  const requestIdRef = useRef(0);

  // Debounce the input value
  const debouncedValue = useDebounce(value, 300);

  // Fetch suggestions using the new API
  const fetchSuggestions = useCallback(
    async (input: string) => {
      // Increment request ID to track the latest request
      const currentRequestId = ++requestIdRef.current;

      if (!placesLibrary || input.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { AutocompleteSuggestion } = placesLibrary;
        const request: google.maps.places.AutocompleteRequest = {
          input: input,
          includedPrimaryTypes: ["locality", "administrative_area_level_2"],
          language: "en", // fixed: use languageCode
        };

        if (countryCode) {
          request.includedRegionCodes = [countryCode.toUpperCase()];
        }

        const { suggestions } =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        // Only update state if this request is still the latest
        if (currentRequestId === requestIdRef.current) {
          setSuggestions(suggestions);
        }
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        if (currentRequestId === requestIdRef.current) {
          setSuggestions([]);
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [placesLibrary, countryCode],
  );

  // Trigger fetch when debounced value changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSuggestions(debouncedValue);
  }, [debouncedValue, fetchSuggestions]);

  // Handle selection
  const handleSelect = async (
    suggestion: google.maps.places.AutocompleteSuggestion,
  ) => {
    try {
      const place = await suggestion.placePrediction?.toPlace();
      if (place) {
        await place.fetchFields({
          fields: ["formattedAddress", "addressComponents", "id"],
        });
        const cityName =
          place.addressComponents?.find(
            (c) =>
              c.types.includes("locality") ||
              c.types.includes("administrative_area_level_2"),
          )?.longText || "";
        onChange(cityName);
        if (onSelect) onSelect(place);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        value={value}
        autoComplete="new-city"
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => {
          if (onFocus) onFocus();
          setShowDropdown(true);
        }}
        onBlur={() => {
          if (onBlur) onBlur();
          setTimeout(() => setShowDropdown(false), 150);
        }}
        placeholder={placeholder}
        readOnly={readOnly || !placesLibrary}
        className={inputClassName}
      />
      {showDropdown && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
          )}
          {!isLoading &&
            suggestions.map((suggestion) => (
              <div
                key={suggestion.placePrediction?.placeId}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onMouseDown={() => handleSelect(suggestion)}
              >
                {suggestion.placePrediction?.text?.text ||
                  suggestion.placePrediction?.secondaryText?.text}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
