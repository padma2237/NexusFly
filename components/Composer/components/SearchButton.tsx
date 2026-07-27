import React from "react";
import { Globe } from "lucide-react-native";

import ActionButton from "./ActionButton";

import { useComposerTheme } from "../config/useComposerTheme";

import {
  ICON_SIZE,
} from "../config/constants";

import { SearchButtonProps } from "../types";

export default function SearchButton({
  enabled,
  onPress,
}: SearchButtonProps) {
  const theme = useComposerTheme();

  return (
    <ActionButton
      onPress={onPress}
      icon={
        <Globe
          size={ICON_SIZE}
          color={
            enabled
              ? theme.primary
              : theme.text
          }
        />
      }
    />
  );
}