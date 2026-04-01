import "@/app/globals.css";
import { AppProviders } from "@/shared/providers/app-providers";
import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Home New Home",
  description: "Build your home, one decision at a time."
};

const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display"
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sansFont.variable} ${displayFont.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
