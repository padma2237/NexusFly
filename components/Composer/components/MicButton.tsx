import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles";

import { useComposerTheme } from "../config/useComposerTheme";
import { ICON_SIZE } from "../config/constants";

export default function MicButton({
  onPress,
}: {
  onPress?: () => void;
}) {
  const theme = useComposerTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.iconButton}
      onPress={onPress}
    >
      <View style={styles.iconContent}>
        <Ionicons
          name="mic-outline"
          size={ICON_SIZE}
          color={theme.text}
        />
      </View>
    </TouchableOpacity>
  );
}