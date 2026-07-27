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
}: RightActionsProps) {
  return (
    <View style={styles.rightActions}>
      {hasText ? (
        <SendButton
          hasText={hasText}
          isLoading={isLoading}
          onSend={onSend}
        />
      ) : (
        <MicButton />
      )}
    </View>
  );
}
