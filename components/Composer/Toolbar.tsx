import React from "react";
import Animated from "react-native-reanimated";
import styles from "./styles";

import LeftActions from "./components/LeftActions";
import RightActions from "./components/RightActions";

import {ToolbarProps} from "./types";

export default function Toolbar({
  animatedStyle,
  hasText,
  isLoading,
  isListening,
  isTranscribing,
  webSearchEnabled,
  onSend,
  onStop,
  onMicPress,
  onAttachmentPress,
  onToggleWebSearch,
}: ToolbarProps) {


  return (
    <Animated.View
      style={[
        styles.toolbar,
        animatedStyle,
      ]}
      >
      <LeftActions
        webSearchEnabled={webSearchEnabled}
        onAttachmentPress={onAttachmentPress}
        onToggleWebSearch={onToggleWebSearch}
        />

      <RightActions
        hasText={hasText}
        isLoading={isLoading}
        isListening={isListening}
        isTranscribing={isTranscribing}
        onSend={onSend}
        onStop={onStop}
        onMicPress={onMicPress}
        />
    </Animated.View>
  );
}