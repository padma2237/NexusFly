import React, {
  useRef,
  useState,
  useEffect
} from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  View,

} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  StatusBar
} from "expo-status-bar";

import Header from "../components/Header";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Colors from "../constants/colors";
import {
  sendMessage
} from "../services/api";

import {
  Message
} from "../types/chat";
import {
  useConversation
} from "../context/ConversationContext";
import TypingIndicator from "../components/TypingIndicator";
import {
  useNavigation,
  DrawerActions
} from "@react-navigation/native";

export default function ChatScreen() {
  const {
    currentConversation,
    currentConversationId,
    createNewConversation,
    setConversations,
  } = useConversation();

  const navigation = useNavigation();

  const messages = currentConversation?.messages ?? [];

  const flatListRef = useRef < FlatList < Message>>(null);
  const contentHeight = useRef(0);

  const isUserNearBottom = useRef(true);

  const [inputHeight,
    setInputHeight] = useState(0);

  const [listHeight,
    setListHeight] = useState(0);

  const [webSearchEnabled,
    setWebSearchEnabled] = useState(false);


  const [inputText,
    setInputText] = useState("");
  const [isLoading,
    setIsLoading] = useState(false);

  const scrollToLatest = () => {
    setTimeout(() => {
      const offset = Math.max(
        0,
        contentHeight.current - listHeight + inputHeight + 32
      );

      flatListRef.current?.scrollToOffset({
        offset,
        animated: true,
      });
    }, 100);
  };

  useEffect(() => {
    setInputText("");
  }, [currentConversationId]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    let activeConversation = currentConversation;

    if (!activeConversation) {
      activeConversation = createNewConversation();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputText,
      createdAt: Date.now(),
    };

    const updatedMessages = [...messages,
      userMessage];
    const newTitle =
    activeConversation.title === "New Chat"
    ? inputText.slice(0, 30): activeConversation.title;

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeConversation.id
        ? {
          ...chat,
          title: newTitle,
          messages: updatedMessages,
          updatedAt: Date.now(),
        }: chat
      )
    );


    scrollToLatest();


    setInputText("");
    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const aiText = await sendMessage(updatedMessages, webSearchEnabled);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: aiText,
        createdAt: Date.now(),
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeConversation.id
          ? {
            ...chat,
            messages: [...chat.messages, assistantMessage],
            updatedAt: Date.now(),
          }: chat
        )
      );

      scrollToLatest();



    } catch {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: "Error connecting to AI.",
        createdAt: Date.now(),
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeConversation.id
          ? {
            ...chat,
            messages: [...chat.messages, errorMessage],
            updatedAt: Date.now(),
          }: chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Header
        title="NexusFly"
        onMenuPress={() =>
        navigation.dispatch(DrawerActions.openDrawer())
        }
        onSearchPress={() => {}}
        onSettingsPress={() =>
        navigation.navigate("Settings" as never)
        }
        />

      <KeyboardAvoidingView
        style={styles.chatWrapper}
        onLayout={(e) => {
          setListHeight(e.nativeEvent.layout.height);
        }}
        behavior={Platform.OS === "ios" ? "padding": "height"}
        >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={[
            styles.chatScroll,
            {
              paddingBottom: inputHeight + 24,
            },
          ]}

          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}

          onScroll={({
            nativeEvent
          }) => {
            const {
              layoutMeasurement, contentOffset, contentSize
            } = nativeEvent;

            isUserNearBottom.current =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 120;
          }}

          ListFooterComponent={
          isLoading ? <TypingIndicator />: null
          }

          onContentSizeChange={(width, height) => {
            contentHeight.current = height;

            if (isLoading || isUserNearBottom.current) {
              scrollToLatest();
            }
          }}

          />
        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          isLoading={isLoading}
          onHeightChange={setInputHeight}
          webSearchEnabled={webSearchEnabled}
          onToggleWebSearch={() =>
          setWebSearchEnabled((prev) => !prev)
          }
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
      paddingHorizontal: 20,
      paddingTop: 20,
    },
  });