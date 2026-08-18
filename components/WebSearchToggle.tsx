import React, { useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Globe } from "lucide-react-native";

import { useTheme } from "../theme/useTheme";

interface WebSearchToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function WebSearchToggle({
  enabled,
  onToggle,
}: WebSearchToggleProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[
        styles.button,
        enabled && styles.activeButton,
      ]}
    >
      <Globe
        size={20}
        color={
          enabled
            ? colors.text
            : colors.subText
        }
      />
    </TouchableOpacity>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      marginRight: 4,
    },

    activeButton: {
      backgroundColor: colors.primary,
    },
  });