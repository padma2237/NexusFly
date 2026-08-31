{/*
import React from "react";
import { View, StyleSheet } from "react-native";

import ChatBubble from "../ChatBubble";
import { Message } from "../../types/chat";

interface MessageItemProps {
  message: Message;
  onRegenerate?: () => void;
  onEdit?: () => void;
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
        onEdit={onEdit}
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

import React from "react";
import { View, StyleSheet } from "react-native";

import ChatBubble from "../ChatBubble";
import UserMessageActions from "./UserMessageActions";

import { Message } from "../../types/chat";

interface MessageItemProps {
  message: Message;
  onRegenerate?: () => void;
}

export default React.memo(function MessageItem({
  message,
  onRegenerate,
}: MessageItemProps) {
  const isUser = message.role === "user";

  return (
    <View
      style={[
        styles.row,
        isUser
          ? styles.userRow
          : styles.aiRow,
      ]}
    >
      <ChatBubble
        message={message}
        onRegenerate={onRegenerate}
      />

      {isUser && message.text.trim().length > 0 && (
        <UserMessageActions
          text={message.text}
        />
      )}
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
