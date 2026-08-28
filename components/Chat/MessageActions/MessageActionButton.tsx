import React from "react";
import {
  Pressable,
  StyleSheet,
} from "react-native";

interface MessageActionButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export default function MessageActionButton({
  icon,
  onPress,
  disabled = false,
}: MessageActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.55,
  },
});