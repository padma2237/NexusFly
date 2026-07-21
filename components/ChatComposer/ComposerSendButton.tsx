import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Send, Mic } from "lucide-react-native";
import { useTheme } from "../../theme/useTheme";

interface Props {
  hasText: boolean;
  isLoading: boolean;
  onSend: () => void;
}

export default function ComposerSendButton({
  hasText,
  isLoading,
  onSend,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={hasText ? onSend : undefined}
      style={[
        styles.button,
        {
          backgroundColor: hasText
            ? colors.primary
            : colors.border,
        },
      ]}
    >
      {hasText ? (
        <Send size={20} color="#fff" />
      ) : (
        <Mic size={20} color={colors.text} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});