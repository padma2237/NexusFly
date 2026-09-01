import React from "react";
import { View, StyleSheet } from "react-native";

import ChatBubble from "../ChatBubble";
import { Message } from "../../types/chat";

interface MessageItemProps {
  message: Message;
  onRegenerate?: () => void;
  onEdit?: (message: Message) => void;
}

export default React.memo(function MessageItem({
  message,
  onRegenerate,
  onEdit,
}: MessageItemProps) {
  return (
    <View
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
        onEdit={
          message.role === "user"
            ? () => onEdit?.(message)
            : undefined
        }
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







{/*
import React from "react";
import { View, StyleSheet } from "react-native";

import ChatBubble from "../ChatBubble";
import { Message } from "../../types/chat";

interface MessageItemProps {
  message: Message;
  onRegenerate?: () => void;
  onEdit?: (text: string) => void;
}

export default React.memo(function MessageItem({
  message,
  onRegenerate,
  onEdit,
}: MessageItemProps) {
  return (
    <View
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
        onEdit={
          message.role === "user"
            ? () => onEdit?.(message.text)
            : undefined
        }
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

*/}