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
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="../../public/favicon/favicon.ico" type="image/x-icon" />
        {/* Meta tags and other head elements */}
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <ThemeSwitcher />
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">{children}</div> {/* Make the content fill the space */}
          <Footer />
        </div>
      </body>
    </html>
  );
}

