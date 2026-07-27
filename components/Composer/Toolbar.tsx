import React from "react";
import Animated from "react-native-reanimated";

import styles from "./styles";


import LeftActions from "./components/LeftActions";
import RightActions from "./components/RightActions";

import { ToolbarProps } from "./types";

export default function Toolbar({
  hasText,
  isLoading,

  webSearchEnabled,

  onSend,
  onAttachmentPress,
  onToggleWebSearch,
}: ToolbarProps) {
  return (
    <Animated.View style={styles.toolbar}>
      <LeftActions
        webSearchEnabled={webSearchEnabled}
        onAttachmentPress={onAttachmentPress}
        onToggleWebSearch={onToggleWebSearch}
      />

      <RightActions
        hasText={hasText}
        isLoading={isLoading}
        onSend={onSend}
      />
    </Animated.View>
  );
}