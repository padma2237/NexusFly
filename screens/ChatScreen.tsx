import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  FlatList,
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
import MessageItem from "../components/Chat/MessageItem";
import ChatList from "../components/Chat/ChatList";


const MessageRow = React.memo(
  ({
    item,
    index,
    isLastAssistant,
    handleRegenerate,
  }: any) => {
    return (
      <View>
        <MessageItem
          message={item}
          onRegenerate={
            isLastAssistant
              ? handleRegenerate
              : undefined
          }
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.isLastAssistant === nextProps.isLastAssistant &&
      prevProps.index === nextProps.index
    );
  }
);



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
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const messages = currentConversation?.messages ?? [];
  const flatListRef = useRef < FlatList < Message>>(null);

  
  const isUserNearBottom = useRef(true);
  
  const scrollToMessage = useCallback((index: number) => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.35,
      });
    }, 50);
  });
}, []);

  
  const [webSearchEnabled,
    setWebSearchEnabled] = useState(false);
  const [inputText,
    setInputText] = useState("");
  const [isLoading,
    setIsLoading] = useState(false);
    
    const [composerHeight, setComposerHeight] = useState(0);
    
    const handleComposerLayout = useCallback((event: any) => {
  const height = event.nativeEvent.layout.height;

  setComposerHeight(height);
}, []);

  

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
      
      const newMessageIndex = updatedMessages.length - 1;
      
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
    scrollToMessage(newMessageIndex);
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
      
      requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  });
});

    } catch (error) {
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

  const handleRegenerate = useCallback(async () => {
    if (messages.length < 2 || isLoading) return;

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
    scrollToMessage(userIndex);

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

  return (
    <SafeAreaView style={styles.container} edges={["left",
      "right",
      "bottom"]}>
      <StatusBar style="auto" />
      <Header
        title="NexusFly"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        onNewChatPress={() => {
          createNewConversation();
          Keyboard.dismiss();
          flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }}
        onSettingsPress={() => navigation.navigate("Settings" as never)}
        />
        
        <View style={styles.chatWrapper}>

          
  <ChatList
  flatListRef={flatListRef}
  messages={messages}
  isLoading={isLoading}
  isUserNearBottom={isUserNearBottom}
  setInputText={setInputText}
  composerHeight={composerHeight}

  renderItem={({ item, index }) => (
    <MessageRow
      item={item}
      index={index}
      isLastAssistant={
        index === messages.length - 1 &&
        item.role === "assistant"
      }
      handleRegenerate={handleRegenerate}
    />
  )}
/>
        <Composer
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          isLoading={isLoading}
          webSearchEnabled={webSearchEnabled}
          onToggleWebSearch={() => setWebSearchEnabled(!webSearchEnabled)}
          onLayout={handleComposerLayout}
          />
      </View>
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
  });