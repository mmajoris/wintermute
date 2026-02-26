"use client";

import { createContext, useContext, useCallback } from "react";

export interface HudTheme {
  r: number;
  g: number;
  b: number;
  brightness: number;
}

export const HudThemeContext = createContext<HudTheme>({
  r: 0,
  g: 200,
  b: 220,
  brightness: 1,
});

export function useHudColor() {
  const { r, g, b, brightness } = useContext(HudThemeContext);
  return useCallback(
    (alpha: number) =>
      `rgba(${r}, ${g}, ${b}, ${Math.min(1, alpha * brightness)})`,
    [r, g, b, brightness]
  );
}

export function HudThemeProvider({
  r = 0,
  g = 200,
  b = 220,
  brightness = 1,
  children,
}: Partial<HudTheme> & { children: React.ReactNode }) {
  return (
    <HudThemeContext.Provider value={{ r, g, b, brightness }}>
      {children}
    </HudThemeContext.Provider>
  );
}
