import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  Appearance,
  ColorSchemeName,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { themes, ThemeName } from "./index";

const STORAGE_KEY = "nexusfly_theme_v2";

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
    useState<ThemeName>("system");
    
    const [systemTheme, setSystemTheme] =
  useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );
  useEffect(() => {
  const subscription =
    Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

  return () => subscription.remove();
}, []);
  

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem(
        STORAGE_KEY
      )
      
      if (
  savedTheme === "system" ||
  savedTheme in themes
)
      {
        setThemeName(savedTheme as ThemeName);
      }
    })();
  }, []);

  const setTheme = async (theme: ThemeName) => {
    setThemeName(theme);
    await AsyncStorage.setItem(
      STORAGE_KEY,
      theme
    );
  };


  const value = useMemo(
    () => ({
      themeName,
      colors:
  themeName === "system"
    ? systemTheme === "dark"
      ? themes.dark.colors
      : themes.light.colors
    :themes[themeName as keyof typeof themes].colors,
      setTheme,
    }),
    [themeName, systemTheme ]
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