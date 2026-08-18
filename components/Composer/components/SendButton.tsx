import React from "react";
import { TouchableOpacity } from "react-native";

import { Send, Mic } from "lucide-react-native";

import Animated from "react-native-reanimated";

import styles from "../styles";

import { useComposerTheme } from "../config/useComposerTheme";
import { SEND_ICON_SIZE } from "../config/constants";

import { SendButtonProps } from "../types";

export default function SendButton({
  hasText,
  isLoading,
  onSend,
}: SendButtonProps) {
  const theme = useComposerTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      onPress={hasText ? onSend : undefined}
    >
      <Animated.View
        style={[
          styles.sendButton,
          {
            backgroundColor: hasText
              ? theme.primary
              : "transparent",
          },
        ]}
      >
        {hasText ? (
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