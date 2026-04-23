// public/theme-script.js
(function() {
    const STORAGE_KEY = "codescripted-key";
    const LIGHT = "light";
    const DARK = "dark";
    const SYSTEM = "system";

    try {
        const mode = localStorage.getItem(STORAGE_KEY) || SYSTEM;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const resolvedMode = mode === SYSTEM ? (prefersDark ? DARK : LIGHT) : mode;

        if (resolvedMode === DARK) {
            document.documentElement.classList.add(DARK);
            document.documentElement.classList.remove(LIGHT);
            document.documentElement.setAttribute("data-mode", "dark");
        } else {
            document.documentElement.classList.add(LIGHT);
            document.documentElement.classList.remove(DARK);
            document.documentElement.setAttribute("data-mode", "light");
        }
    } catch (e) {
        console.error('Theme initialization error:', e);
    }
})();