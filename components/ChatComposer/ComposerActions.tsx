import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Plus } from "lucide-react-native";
import WebSearchToggle from "../WebSearchToggle";
import { useTheme } from "../../theme/useTheme";

interface Props {
  onAttachmentPress: () => void;
  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

export default function ComposerActions({
  onAttachmentPress,
  webSearchEnabled,
  onToggleWebSearch,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onAttachmentPress}
        activeOpacity={0.8}
        style={styles.icon}
      >
        <Plus size={22} color={colors.text} />
      </TouchableOpacity>

      <WebSearchToggle
        enabled={webSearchEnabled}
        onToggle={onToggleWebSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
});