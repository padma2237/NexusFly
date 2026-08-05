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

import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  StatusBar
} from "expo-status-bar";

import Header from "../components/Header";

import Composer from "../components/Composer";

import {
  useTheme
} from "../theme/useTheme";

import {
  sendMessage
} from "../services/api";

import {
  Message
} from "../types/chat";
import {
  useConversation
} from "../context/ConversationContext";

import {
  useNavigation,
  DrawerActions
} from "@react-navigation/native";

import ChatList from "../components/Chat/ChatList";

import ChatBubble from "../components/ChatBubble";

export default function ChatScreen() {
  const {
    currentConversation,
    currentConversationId,
    createNewConversation,
    setConversations,
  } = useConversation();

  const navigation = useNavigation();

  const {
    colors,
    themeName,
    setTheme
  } = useTheme();

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
  const [composerHeight, setComposerHeight] = useState(0);

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
    <SafeAreaView style={styles.container}
      edges={["left",
        "right",
        "bottom"]}
      >
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
  <View
    style={styles.chatWrapper}
    onLayout={(e) => {
      setListHeight(e.nativeEvent.layout.height);
    }}
  >
    
    <ChatList
      flatListRef={flatListRef}
      messages={messages}
      isLoading={isLoading}
      composerHeight={composerHeight}
      renderItem={renderItem}
      setInputText={setInputText}
      contentHeight={contentHeight}
      isUserNearBottom={isUserNearBottom}
      scrollToLatest={scrollToLatest}
    />
    
    <Composer
  value={inputText}
  onChangeText={setInputText}
  onSend={handleSend}
  isLoading={isLoading}
  webSearchEnabled={webSearchEnabled}
  onToggleWebSearch={() =>
    setWebSearchEnabled(!webSearchEnabled)
  }
  onLayout={(e) =>
    setComposerHeight(e.nativeEvent.layout.height)
  }
/>
    
    
    
  </View>
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
  }
  );