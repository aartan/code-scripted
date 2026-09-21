"use client";

import { useEffect, useState } from "react";
import styles from "./switch.module.css";

type ColorSchemePreference = "light" | "dark" | "system";

export const STORAGE_KEY = "codescripted-key";
const modes: ColorSchemePreference[] = ["light", "dark", "system"];

// Make sure this matches exactly what's in your layout.tsx script
const updateDOMTheme = (mode: ColorSchemePreference) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolvedMode =
    mode === "system" ? (prefersDark ? "dark" : "light") : mode;

  if (resolvedMode === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    document.documentElement.setAttribute("data-mode", "dark");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-mode", "light");
  }
};

export const ThemeSwitcher = () => {
  const [mode, setMode] = useState<ColorSchemePreference | null>(null);

  useEffect(() => {
    // Initialize mode from localStorage or default to "light"
    const storedMode =
      (localStorage.getItem(STORAGE_KEY) as ColorSchemePreference) || "light";
    setMode(storedMode);
  }, []);

  useEffect(() => {
    if (mode) {
      localStorage.setItem(STORAGE_KEY, mode);
      updateDOMTheme(mode);
    }
  }, [mode]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode as ColorSchemePreference);
    const newMode = modes[(index + 1) % modes.length];
    setMode(newMode);
  };

  if (mode === null) return null;

  // Get a readable description of the current mode
  const getCurrentModeLabel = () => {
    switch (mode) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "Theme";
    }
  };

  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      data-mode={mode}
      onClick={handleModeSwitch}
      aria-label={`Theme: ${getCurrentModeLabel()}. Click to change.`}
      title={`Switch theme (currently: ${getCurrentModeLabel()})`}
    >
      <span className={styles.srOnly || "sr-only"}>
        Change theme (currently: {getCurrentModeLabel()})
      </span>
    </button>
  );
};
