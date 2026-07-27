import React from "react";
import { View } from "react-native";

import styles from "../styles";

import AttachmentButton from "./AttachmentButton";
import SearchButton from "./SearchButton";

import { LeftActionsProps } from "../types";

export default function LeftActions({
  webSearchEnabled,
  onAttachmentPress,
  onToggleWebSearch,
}: LeftActionsProps) {
  return (
    <View style={styles.leftActions}>
      <AttachmentButton
        onPress={onAttachmentPress}
      />

      <SearchButton
        enabled={webSearchEnabled}
        onPress={onToggleWebSearch}
      />
    </View>
  );
}