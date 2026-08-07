import React from "react";
import { View, StyleSheet, LayoutChangeEvent, } from "react-native";

import ChatBubble from "../ChatBubble";
import { Message } from "../../types/chat";

interface Props {
  message: Message;
  onRegenerate?: () => void;
  
  onLayout?: (
    id: string,
    y: number,
    height: number
  ) => void;
}

export default React.memo(function MessageItem({
  message,
  onRegenerate,
  onLayout,
}: Props) {
  
  const handleLayout = (e: LayoutChangeEvent) => {
  if (!onLayout) return;

  const { y, height } = e.nativeEvent.layout;

  onLayout(message.id, y, height);
};
  return (
    <View
    onLayout={handleLayout}
      style={[
        styles.row,
        message.role === "user"
          ? styles.userRow
          : styles.aiRow,
      ]}
    >
      <ChatBubble
        message={message}
        onRegenerate={onRegenerate}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    width: "100%",
    marginBottom: 16,

    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  userRow: {
    alignItems: "flex-end",
  },

  aiRow: {
    alignItems: "flex-start",
  },
});