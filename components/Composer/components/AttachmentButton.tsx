import React from "react";
import { Plus } from "lucide-react-native";

import ActionButton from "./ActionButton";

import { useComposerTheme } from "../config/useComposerTheme";

import { ICON_SIZE } from "../config/constants";

import { AttachmentButtonProps } from "../types";

export default function AttachmentButton({
  onPress,
}: AttachmentButtonProps) {
  const theme = useComposerTheme();

  return (
    <ActionButton
      onPress={onPress}
      icon={
        <Plus
          size={ICON_SIZE}
          color={theme.text}
        />
      }
    />
  );
}