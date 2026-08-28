import React from "react";
import { View } from "react-native";

import styles from "../styles";
import SendButton from "./SendButton";
import MicButton from "./MicButton";
import { RightActionsProps } from "../types";

export default function RightActions({
  hasText,
  isLoading,
  onSend,
  onStop,
}: RightActionsProps) {
  return (
    <View style={styles.rightActions}>
      {hasText || isLoading ? (
        <SendButton
          hasText={hasText}
          isLoading={isLoading}
          onSend={onSend}
          onStop={onStop}
        />
      ) : (
        <MicButton />
      )}
    </View>
  );
}