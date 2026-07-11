import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Globe } from "lucide-react-native";
import Colors from "../constants/colors";

interface WebSearchToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function WebSearchToggle({
  enabled,
  onToggle,
}: WebSearchToggleProps) {
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
        color={enabled ? "#ffffff" : Colors.subText}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.border,
    marginRight: 8,
  },

  activeButton: {
    backgroundColor: "#2563eb",
  },
});