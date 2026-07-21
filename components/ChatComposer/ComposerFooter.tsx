import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {
  Plus,
  Send,
  Mic
} from "lucide-react-native";
import WebSearchToggle from "../WebSearchToggle";
import {
  useTheme
} from "../../theme/useTheme";

interface Props {
  hasText: boolean;
  isLoading: boolean;
  onSend: () => void;
  onAttachmentPress: () => void;
  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

export default function ComposerFooter({
  hasText,
  isLoading,
  onSend,
  onAttachmentPress,
  webSearchEnabled,
  onToggleWebSearch,
}: Props) {
  const {
    colors
  } = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <TouchableOpacity
          onPress={onAttachmentPress}
          style={styles.icon}
          activeOpacity={0.8}
          >
          <Plus size={24} color={colors.text} />
        </TouchableOpacity>

        <WebSearchToggle
          enabled={webSearchEnabled}
          onToggle={onToggleWebSearch}
          />
      </View>

      <TouchableOpacity
        disabled={isLoading}
        onPress={hasText ? onSend: undefined}
        style={[
          styles.send,
          {
            backgroundColor: hasText
            ? colors.primary: colors.border,
          },
        ]}
        >
        {hasText ? (
          <Send size={20} color="#fff" />
        ): (
          <Mic size={20} color={colors.text} />
        )}
      </TouchableOpacity>
    </View>
  );
}

  const styles = StyleSheet.create({
    row: {
  marginTop: 4,
  paddingBottom: 2,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    icon: {
      width: 36,
height: 36,
borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    send: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    
  });