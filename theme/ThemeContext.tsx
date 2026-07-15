import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { themes, ThemeName } from "./index";

type ThemeContextType = {
  themeName: ThemeName;
  colors: typeof themes.dark.colors;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeName, setThemeName] =
    useState<ThemeName>("dark");

  const value = useMemo(
    () => ({
      themeName,
      colors: themes[themeName].colors,
      setTheme: setThemeName,
    }),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}