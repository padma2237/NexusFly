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
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Header from "../components/Header";
import Composer from "../components/Composer";
import { useTheme } from "../theme/useTheme";
import { sendMessage } from "../services/api";
import { Message } from "../types/chat";
import { useConversation } from "../context/ConversationContext";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import MessageItem from "../components/Chat/MessageItem";
import ChatList from "../components/Chat/ChatList";

// 1. THE FIXED ROW COMPONENT
// We replaced onLayout with a useEffect that triggers a precise scrollToIndex
const MessageRow = React.memo(({ 
  item, 
  index, 
  isLastAssistant, 
  listHeight, 
  handleRegenerate, 
  pendingAnchorMessageId,
  flatListRef
}: any) => {

  useEffect(() => {
    // When this exact message mounts, check if it's the one we need to anchor
    if (pendingAnchorMessageId.current === item.id) {
      pendingAnchorMessageId.current = null;
      
      // Give the list a tiny fraction of a second to settle any keyboard animations
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: index,
          viewPosition: 0, // This locks the top of the message to the top of the screen
          viewOffset: 120, // TWEAK THIS NUMBER to align exactly with your green dot
          animated: true,
        });
      }, 300); 
    }
  }, [item.id, index]); 

  return (
    <View>
      <MessageItem
        message={item}
        onRegenerate={isLastAssistant ? handleRegenerate : undefined}
      />
    </View>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.isLastAssistant === nextProps.isLastAssistant &&
    prevProps.index === nextProps.index &&
    prevProps.listHeight === nextProps.listHeight
  );
});

export default function ChatScreen() {
  const WINDOW_HEIGHT = Dimensions.get("window").height;
  const USER_ANCHOR = WINDOW_HEIGHT * 0.45;

  const {
    currentConversation,
    currentConversationId,
    createNewConversation,
    setConversations,
  } = useConversation();

  const navigation = useNavigation();
  const { colors, themeName, setTheme } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const messages = currentConversation?.messages ?? [];
  const flatListRef = useRef<FlatList<Message>>(null);

  // We no longer need messageLayouts tracking!
  const contentHeight = useRef(0);
  const isUserNearBottom = useRef(true);
  const pendingAnchorMessageId = useRef<string | null>(null);

  const [listHeight, setListHeight] = useState(0);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollToLatest = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 150);
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

    const updatedMessages = [...messages, userMessage];
    const newTitle =
      activeConversation.title === "New Chat"
        ? inputText.slice(0, 30)
        : activeConversation.title;

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeConversation.id
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
    Keyboard.dismiss();
    setIsLoading(true);
    scrollToLatest();

    try {
      const result = await sendMessage(updatedMessages, webSearchEnabled);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: result.answer,
        sources: result.sources,
        createdAt: Date.now(),
      };

      pendingAnchorMessageId.current = assistantMessage.id;

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeConversation.id
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
                updatedAt: Date.now(),
              }
            : chat
        )
      );
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
              }
            : chat
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
            }
          : chat
      )
    );

    setIsLoading(true);
    scrollToLatest();

    try {
      const result = await sendMessage(updatedMessages, webSearchEnabled);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: result.answer,
        sources: result.sources,
        createdAt: Date.now(),
      };

      pendingAnchorMessageId.current = assistantMessage.id;

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === currentConversationId
            ? {
                ...chat,
                messages: [...updatedMessages, assistantMessage],
                updatedAt: Date.now(),
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, currentConversationId, webSearchEnabled, isLoading]);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
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

      <View
        style={styles.chatWrapper}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
      >
        <ChatList
          flatListRef={flatListRef}
          messages={messages}
          isLoading={isLoading}
          shouldScrollToLatest={false}
          
          renderItem={({ item, index }) => (
            <MessageRow
              item={item}
              index={index}
              isLastAssistant={index === messages.length - 1 && item.role === "assistant"}
              listHeight={listHeight}
              handleRegenerate={handleRegenerate}
              pendingAnchorMessageId={pendingAnchorMessageId}
              flatListRef={flatListRef}
            />
          )}
          
          contentHeight={contentHeight}
          isUserNearBottom={isUserNearBottom}
          scrollToLatest={scrollToLatest}
          setInputText={setInputText}
          onMessageLayout={() => {}} // Pass dummy to avoid breaking ChatList TS
          onContentSizeChange={() => {}}
        />

        <Composer
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          isLoading={isLoading}
          webSearchEnabled={webSearchEnabled}
          onToggleWebSearch={() => setWebSearchEnabled(!webSearchEnabled)}
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
