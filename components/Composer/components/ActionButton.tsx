import React from "react";
import {
  TouchableOpacity,
} from "react-native";

import Animated from "react-native-reanimated";

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
      <Animated.View>
      
        {icon}
      </Animated.View>
    </TouchableOpacity>
  );
}