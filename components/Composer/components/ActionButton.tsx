import React from "react";
import { TouchableOpacity, View } from "react-native";

import styles from "../styles";

import { ActionButtonProps } from "../types";

export default function ActionButton({
  icon,
  onPress,
  disabled = false,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={styles.iconButton}
    >
      <View style={styles.iconContent}>
        {icon}
      </View>
    </TouchableOpacity>
  );
}