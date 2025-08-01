"use client";

import { useState, useEffect } from "react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const STORAGE_KEY = "cookiePreferences";

export function useCookieConsent() {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsented, setHasConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedPreferences = JSON.parse(stored) as CookiePreferences;
        setPreferences(parsedPreferences);
        if (parsedPreferences.analytics) {
          // loadGoogleAnalytics();
        }

        setHasConsented(true);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
    // const insex = setTimeout(() => setIsLoading(false), 2000);
    // return () => clearTimeout(insex);
    setIsLoading(false);
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    const updatedPreferences = {
      ...newPreferences,
      necessary: true, // Always true for required cookies
    };

    setPreferences(updatedPreferences);
    setHasConsented(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences));

    // if (!newPreferences.analytics && preferences.analytics) {
    //   removeCookies(googleAnaliticsCookieNames);
    // }
    if (newPreferences.analytics) {
      // loadGoogleAnalytics();
    }
  };

  const acceptAll = () => {
    updatePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    updatePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return {
    preferences,
    hasConsented,
    isLoading,
    updatePreferences,
    acceptAll,
    rejectAll,
  };
}
