"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import AuthProvider from "./AuthProvider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
}
