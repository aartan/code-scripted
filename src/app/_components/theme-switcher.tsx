"use client";

import { memo, useEffect, useState } from "react";
import styles from "./switch.module.css";

type ColorSchemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "codescripted-key";
const modes: ColorSchemePreference[] = ["light", "dark", "system"];

declare global {
  var updateDOM: () => void;
}

export const NoFOUCScript = (storageKey: string) => {
  const scriptContent = `
    (() => {
      const [LIGHT, DARK, SYSTEM] = ["light", "dark", "system"];
      const modifyTransition = () => {
        const css = document.createElement("style");
        css.textContent = "*,*:after,*:before{transition:none !important;}";
        document.head.appendChild(css);
        return () => {
          getComputedStyle(document.body);
          setTimeout(() => document.head.removeChild(css), 1);
        };
      };
      const mediaQuery = "(prefers-color-scheme: " + DARK + ")";
      const media = matchMedia(mediaQuery);
      window.updateDOM = () => {
        const restoreTransitions = modifyTransition();
        const mode = localStorage.getItem("${storageKey}") ?? SYSTEM;
        const systemMode = media.matches ? DARK : LIGHT;
        const resolvedMode = mode === SYSTEM ? systemMode : mode;
        const classList = document.documentElement.classList;

        if (resolvedMode === DARK) {
          classList.add(DARK);
          classList.remove(LIGHT);
          document.documentElement.setAttribute("data-mode", "dark");
        } else {
          classList.add(LIGHT);
          classList.remove(DARK);
          document.documentElement.setAttribute("data-mode", "light");
        }

        restoreTransitions();
      };
      window.updateDOM(); // Immediately invoke updateDOM to set the initial theme
      media.addEventListener("change", window.updateDOM);
    })();
  `;
  return scriptContent;
};

const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference | null>(null); // Start with null to delay rendering

  useEffect(() => {
    const storedMode = localStorage.getItem(STORAGE_KEY) as ColorSchemePreference;
    if (storedMode) {
      setMode(storedMode);
    } else {
      setMode("light");
    }
  }, []);

  useEffect(() => {
    if (mode && typeof window.updateDOM === "function") { // Ensure updateDOM is defined and callable
      localStorage.setItem(STORAGE_KEY, mode);
      window.updateDOM();
    }
  }, [mode]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode as ColorSchemePreference);
    const newMode = modes[(index + 1) % modes.length];
    setMode(newMode);
  };

  if (mode === null) return null; // Do not render the button until mode is set

  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      data-mode={mode}  // Ensure the mode is applied to the button for styling
      onClick={handleModeSwitch}
    />
  );
};

const Script = memo(() => {
  useEffect(() => {
    const script = document.createElement("script");
    script.textContent = NoFOUCScript(STORAGE_KEY);
    document.head.prepend(script); // Prepend to the head to run it as early as possible

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
});

/**
 * This component which applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
