import Footer from "@/app/_components/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from './_components/theme-switcher';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `CodeScripted`,
  description: `Explore software development and technology insights on CodeScripted, a blog by Abdifatah Artan.`,
  openGraph: {
  },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="shortcut icon" href="../../public/favicon/favicon.ico" type="image/x-icon" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
      (function() {
        const STORAGE_KEY = "codescripted-key";
        const mode = localStorage.getItem(STORAGE_KEY) || "system";
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = mode === "system" ? (prefersDark ? "dark" : "light") : mode;
        
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
          document.documentElement.setAttribute("data-mode", "dark");
        } else {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
          document.documentElement.setAttribute("data-mode", "light");
        }

        // Re-apply when media query changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          const currentMode = localStorage.getItem(STORAGE_KEY) || "system";
          if (currentMode === "system") {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const newTheme = isDark ? "dark" : "light";
            
            if (newTheme === "dark") {
              document.documentElement.classList.add("dark");
              document.documentElement.classList.remove("light");
              document.documentElement.setAttribute("data-mode", "dark");
            } else {
              document.documentElement.classList.add("light");
              document.documentElement.classList.remove("dark");
              document.documentElement.setAttribute("data-mode", "light");
            }
          }
        });
      })();
    `
                }}
            />
        </head>
        <body
            className={cn(
                inter.className,
                "dark:bg-slate-900 dark:text-slate-400"
            )}
        >
        <ThemeSwitcher />
        <div className="min-h-screen flex flex-col" >
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
        </body>
        </html>
    );
}

