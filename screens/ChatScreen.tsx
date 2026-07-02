import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Header from "../components/Header";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Colors from "../constants/colors";
import { sendMessage } from "../services/api";

import { Message } from "../types/chat";
import { useConversation } from "../context/ConversationContext";

export default function ChatScreen() {
  const {
    currentConversation,
    setConversations,
    setCurrentConversationId,
  } = useConversation();

  const messages = currentConversation?.messages ?? [];

  const flatListRef = useRef<FlatList<Message>>(null);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!currentConversation) return;
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputText,
      createdAt: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    const newTitle =
      currentConversation.title === "New Chat"
          ? inputText.slice(0, 30)
              : currentConversation.title;

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === currentConversation.id
          ? {
              ...chat,
                title: newTitle,
                  messages: updatedMessages,
                    updatedAt: Date.now(),
                    }
          



          : chat
      )
    );




    setInputText("");
    setIsLoading(true);

    try {
      const aiText = await sendMessage(updatedMessages);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: aiText,
        createdAt: Date.now(),
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === currentConversation.id
            ? {
              ...chat,
              messages: [...chat.messages, assistantMessage],
              updatedAt: Date.now(),
            }
            : chat
        )
      );



    } catch {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: "Error connecting to AI.",
        createdAt: Date.now(),
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === currentConversation.id
            ? {
              ...chat,
              messages: [...chat.messages, errorMessage],
              updatedAt: Date.now(),
            }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Header title="NexusFly" />

      <KeyboardAvoidingView
        style={styles.chatWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={styles.chatScroll}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  chatWrapper: {
    flex: 1,
  },

  chatScroll: {
    padding: 20,
  },
});