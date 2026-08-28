import React from "react";
import { TouchableOpacity } from "react-native";

import {
  Send,
  Mic,
  Square,
} from "lucide-react-native";

import Animated from "react-native-reanimated";

import styles from "../styles";

import { useComposerTheme } from "../config/useComposerTheme";
import { SEND_ICON_SIZE } from "../config/constants";

import { SendButtonProps } from "../types";

export default function SendButton({
  hasText,
  isLoading,
  onSend,
  onStop,
}: SendButtonProps) {
  const theme = useComposerTheme();

  const handlePress = () => {
    if (isLoading) {
      onStop();
      return;
    }

    if (hasText) {
      onSend();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Animated.View
        style={[
          styles.sendButton,
          {
            backgroundColor:
              hasText || isLoading
                ? theme.primary
                : "transparent",
          },
        ]}
      >
        {isLoading ? (
          <Square
            size={SEND_ICON_SIZE}
            color={theme.sendIcon}
            fill={theme.sendIcon}
          />
        ) : hasText ? (
          <Send
            size={SEND_ICON_SIZE}
            color={theme.sendIcon}
          />
        ) : (
          <Mic
            size={SEND_ICON_SIZE}
            color={theme.text}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}