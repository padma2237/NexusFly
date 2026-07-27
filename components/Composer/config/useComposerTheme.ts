/*
|--------------------------------------------------------------------------
| Composer Theme
|--------------------------------------------------------------------------
|
| Maps your app theme to the Composer.
| No hardcoded UI colors should exist inside Composer components.
|
*/

import { useTheme } from "../../../theme/useTheme";

export function useComposerTheme() {
  const { colors } = useTheme();

  return {
    background: colors.surface,

    border: colors.border,

    text: colors.text,

    placeholder: colors.subText,

    primary: colors.primary,

    icon: colors.text,

    iconActive: colors.primary,

    sendBackground: colors.primary,

    sendIcon: "#FFFFFF",

    inactiveButton: colors.border,
  };
}