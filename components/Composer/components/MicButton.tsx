import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import useTheme the same way AttachmentButton does:
import { useTheme } from "../../../theme/useTheme"; 
import styles from "../styles";

export default function MicButton({ onPress }: { onPress?: () => void }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <Ionicons name="mic-outline" size={22} color={colors.text} />
    </TouchableOpacity>
  );
}
