import React from "react";
import {
  View
} from "react-native";
import Animated from "react-native-reanimated";

import LeftActions from "./components/LeftActions";
import RightActions from "./components/RightActions";

import ComposerCard from "./ComposerCard";
import ComposerBody from "./ComposerBody";

import styles from "./styles";

import useComposer from "./hooks/useComposer";

import ComposerInput from "./components/ComposerInput";
import Toolbar from "./Toolbar";

import {
  ComposerProps
} from "./types";

export default function Composer({
  value,
  isLoading,
  webSearchEnabled,
  onChangeText,
  onSend,
  onAttachmentPress,
  onToggleWebSearch,
}: ComposerProps) {
  const composer = useComposer();

  return (
    <ComposerCard animatedStyle={composer.animation.containerStyle} >
    <ComposerBody
  composer={composer}
  value={value}
  isLoading={isLoading}
  webSearchEnabled={webSearchEnabled}
  onChangeText={onChangeText}
  onSend={onSend}
  onAttachmentPress={onAttachmentPress}
  onToggleWebSearch={onToggleWebSearch}
/>
</ComposerCard>
  );
}