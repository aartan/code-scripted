// src/lib/theme-script.ts
export const STORAGE_KEY = "codescripted-key";

export function getThemeScript(): string {
  return `
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
        const mode = localStorage.getItem("${STORAGE_KEY}") ?? SYSTEM;
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
      window.updateDOM(); // Immediately invoke updateDOM
      media.addEventListener("change", window.updateDOM);
    })();
  `;
}
