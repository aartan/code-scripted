"use client";

import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "codescripted-key";
const modes: ColorSchemePreference[] = ["light", "dark", "system"];

/** to reuse updateDOM function defined inside injected script */

/** function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  const [LIGHT, DARK, SYSTEM] = ["light", "dark", "system"];
  
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
        const mode = localStorage.getItem("${storageKey}") ?? LIGHT;
        const systemMode = media.matches ? DARK : LIGHT;
        const resolvedMode = mode === SYSTEM ? systemMode : mode;
        const classList = document.documentElement.classList;
        if (resolvedMode === DARK) classList.add(DARK);
        else classList.remove(DARK);
        document.documentElement.setAttribute("data-mode", mode);
        restoreTransitions();
      };
      window.updateDOM();
      media.addEventListener("change", window.updateDOM);
    })();
  `;
  return scriptContent;
};


let updateDOM: () => void;

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
    () =>
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) ??
        "light") as ColorSchemePreference, // Default to LIGHT mode
  );

  useEffect(() => {
    // store global functions to local variables to avoid any interference
    updateDOM = window.updateDOM;
    /** Sync the tabs */
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === STORAGE_KEY && setMode(e.newValue as ColorSchemePreference);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    updateDOM();
  }, [mode]);

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

const Script = memo(() => {
  useEffect(() => {
    const script = document.createElement("script");
    script.textContent = NoFOUCScript(STORAGE_KEY);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
});

/**
 * This component wich applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
