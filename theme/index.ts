import darkTheme from "./dark";
import lightTheme from "./light";

import experimentalTheme from "./experimental";
import auroraTheme from "./aurora";

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  experimental: experimentalTheme,
  aurora: auroraTheme,
};

export type ThemeName =
  | keyof typeof themes
  | "system";