import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { Message } from "../types/chat";

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.aiBubble,
      ]}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "85%",
    padding: 14,
    borderRadius: 20,
    marginBottom: 16,
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 6,
  },

  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  text: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
});