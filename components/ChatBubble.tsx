import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { Message } from "../types/chat";
import Markdown from "react-native-markdown-display";


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
      
      {isUser ? (
  <Text style={styles.text}>{message.text}</Text>
) : (
  <Markdown style={markdownStyles}>
    {message.text}
  </Markdown>
)}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "90%",
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
const markdownStyles = {
  body: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 24,
  },

  heading1: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },

  heading2: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },

  code_inline: {
    backgroundColor: "#1e293b",
    color: "#38bdf8",
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  code_block: {
    backgroundColor: "#0f172a",
    color: "#38bdf8",
    padding: 12,
    borderRadius: 10,
  },

  bullet_list: {
    color: Colors.text,
  },

  ordered_list: {
    color: Colors.text,
  },

  strong: {
    color: Colors.text,
    fontWeight: "700",
  },

  em: {
    color: Colors.text,
    fontStyle: "italic",
  },
};