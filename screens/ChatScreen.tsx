import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import EmptyState from "../components/EmptyState";

import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  StatusBar
} from "expo-status-bar";

import Header from "../components/Header";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { useTheme } from "../theme/useTheme";

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
  
  const { colors, themeName, setTheme } = useTheme();
  
  const styles = React.useMemo(
  () => createStyles(colors),
  [colors]
);

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
    if (!inputText.trim() || isLoading) 
    
    return;

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

    setInputText("");
    Keyboard.dismiss();
    setIsLoading(true);

    try {

      const result = await sendMessage(updatedMessages, webSearchEnabled);


      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: result.answer,
        sources: result.sources,
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

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({
          animated: true,
        });
      }, 50);

    }

    catch (error) {
      console.error(error);

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

  const handleRegenerate = useCallback (async () => {
    if (messages.length < 2 || isLoading) return;

    // Find the last user message
    const lastUserIndex = [...messages]
    .reverse()
    .findIndex((m) => m.role === "user");

    if (lastUserIndex === -1) return;

    const userIndex = messages.length - 1 - lastUserIndex;

    const updatedMessages = messages.slice(0, userIndex + 1);

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === currentConversationId
        ? {
          ...chat,
          messages: updatedMessages,
          updatedAt: Date.now(),
        }: chat
      )
    );

    setIsLoading(true);

    try {
      const result = await sendMessage(
        updatedMessages,
        webSearchEnabled
      );

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: result.answer,
        sources: result.sources,
        createdAt: Date.now(),
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === currentConversationId
          ? {
            ...chat,
            messages: [...updatedMessages, assistantMessage],
            updatedAt: Date.now(),
          }: chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  },
    [messages,
      currentConversationId,
      webSearchEnabled,
      isLoading]);

  const renderItem = useCallback(
    ({
      item, index
    }: {
      item: Message; index: number
    }) => (
      <ChatBubble
        message={item}
        onRegenerate={
        index === messages.length - 1 &&
        item.role === "assistant"
        ? handleRegenerate: undefined
        }
        />
    ),
    [messages,
      handleRegenerate]
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Header
        title="NexusFly"
        onMenuPress={() =>
        navigation.dispatch(DrawerActions.openDrawer())
        }
        onNewChatPress={() => {
  createNewConversation();
  Keyboard.dismiss();
  flatListRef.current?.scrollToOffset({
    offset: 0,
    animated: true,
  });
}}
        onSettingsPress={() =>
        navigation.navigate("Settings" as never)
        }
        />

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        >
        <KeyboardAvoidingView
          style={styles.chatWrapper}
          onLayout={(e) => {
            setListHeight(e.nativeEvent.layout.height);
          }}
          behavior={Platform.OS === "ios" ? "padding": "height"}
          >
          <FlatList
            ref={flatListRef}
            
            data={messages.length === 0 ? [{ id: "empty" } as any] : messages}
            initialNumToRender={12}
            maxToRenderPerBatch={8}
            windowSize={7}
            removeClippedSubviews={Platform.OS === "android"}
            keyExtractor={(item) => item.id}

            renderItem={({ item, index }) => {
  if (messages.length === 0) {
    return (
      <EmptyState
        onPromptPress={(prompt) => {
          setInputText(prompt);
        }}
      />
    );
  }

  return renderItem({
    item,
    index,
  } as any);
}}

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
                layoutMeasurement,
                contentOffset,
                contentSize
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

              if (isLoading) {
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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
  
  const createStyles = (colors: any) =>
  
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    chatWrapper: {
      flex: 1,
    },

    chatScroll: {
      paddingHorizontal: 20,
      paddingTop: 80,
    },
  }
  );