import darkTheme from "./dark";
import lightTheme from "./light";

import experimentalTheme from "./experimental";
import blossomTheme from "./blossom";

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  experimental: experimentalTheme,
  blossom: blossomTheme,
};

export type ThemeName =
  | keyof typeof themes
  | "system";