import React from "react";
import { View, StyleSheet } from "react-native";

import ComposerActions from "./ComposerActions";
import ComposerSendButton from "./ComposerSendButton";

interface Props {

  hasText: boolean;
  isLoading: boolean;

  onSend: () => void;
  onAttachmentPress: () => void;

  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

export default function AnimatedToolbar({
  
  hasText,
  isLoading,
  onSend,
  onAttachmentPress,
  webSearchEnabled,
  onToggleWebSearch,
}: Props) {
  
  
  
  

  return (
      
      <View style={styles.container}>
      <ComposerActions
        onAttachmentPress={onAttachmentPress}
        webSearchEnabled={webSearchEnabled}
        onToggleWebSearch={onToggleWebSearch}
      />

      <ComposerSendButton
        hasText={hasText}
        isLoading={isLoading}
        onSend={onSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
  },
});