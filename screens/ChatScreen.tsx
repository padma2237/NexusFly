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
  SafeAreaView,
} from "react-native-safe-area-context";
import {
  StatusBar,
} from "expo-status-bar";

import { LinearGradient } from "expo-linear-gradient";

import Header from "../components/Header";
import Composer from "../components/Composer";

import {
  useTheme,
} from "../theme/useTheme";

import {
  sendMessage,
} from "../services/api";

import {
  Message,
} from "../types/chat";

import {
  useConversation,
} from "../context/ConversationContext";

import {
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";

import ChatList, {
  ChatListHandle,
} from "../components/Chat/ChatList";

import MessageRow from "../components/Chat/MessageRow";


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
    useGradient,
  } = useTheme();

  const styles = React.useMemo(
    () => createStyles(colors, useGradient ),
    [colors, useGradient ]
  );

  const messages =
  currentConversation?.messages ?? [];

  const flatListRef =
  useRef < FlatList < Message>>(null);

  const chatListRef =
  useRef < ChatListHandle > (null);


  const [
    webSearchEnabled,
    setWebSearchEnabled,
  ] = useState(false);

  const [
    inputText,
    setInputText,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    composerHeight,
    setComposerHeight,
  ] = useState(0);


  const handleComposerLayout =
  useCallback((event: any) => {
    const height =
    event.nativeEvent.layout.height;

    setComposerHeight(height);
  }, []);


  useEffect(() => {
    setInputText("");

    const timer = setTimeout(() => {
      if (messages.length === 0) {
        // New/empty conversation → always return to the top.
        chatListRef.current?.scrollToTop();
      } else {
        // Existing conversation → show the latest messages.
        chatListRef.current?.scrollToLatest();
      }
    },
      100);

    return () => clearTimeout(timer);
  }, [currentConversationId]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) {
      return;
    }

    let activeConversation =
    currentConversation;

    if (!activeConversation) {
      activeConversation =
      createNewConversation();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputText,
      createdAt: Date.now(),
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    const newMessageIndex =
    updatedMessages.length - 1;

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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        chatListRef.current?.scrollToMessage(
          newMessageIndex,
          0.25
        );
      });
    });


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

      const finalMessages = [
        ...updatedMessages,
        assistantMessage,
      ];

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeConversation.id
          ? {
            ...chat,
            messages: finalMessages,
            updatedAt: Date.now(),
          }: chat
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
            messages: [
              ...chat.messages,
              errorMessage,
            ],
            updatedAt: Date.now(),
          }: chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };


  const handleRegenerate =
  useCallback(async () => {
    if (
      messages.length < 2 ||
      isLoading
    ) {
      return;
    }

    const lastUserIndex =
    [...messages]
    .reverse()
    .findIndex(
      (m) => m.role === "user"
    );

    if (lastUserIndex === -1) {
      return;
    }

    const userIndex =
    messages.length -
    1 -
    lastUserIndex;

    const updatedMessages =
    messages.slice(0, userIndex + 1);

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
            messages: [
              ...updatedMessages,
              assistantMessage,
            ],
            updatedAt: Date.now(),
          }: chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  },
    [
      messages,
      currentConversationId,
      webSearchEnabled,
      isLoading,
    ]);


  return (
    
      
      
      <SafeAreaView
  style={styles.container}
  edges={["left", "right", "bottom", "top"]}
>
  


{useGradient ? (
  <LinearGradient
    colors={colors.backgroundGradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFill}
  />
) : (
  <View
    pointerEvents="none"
    style={[
      StyleSheet.absoluteFill,
      {
        backgroundColor: colors.background,
      },
    ]}
  />
)}
      
      <StatusBar style="auto" />

      {/* ---------------------------------
          BLOSSOM ATMOSPHERE
          ---------------------------------
          Only enabled for Blossom.

          These soft translucent layers create
          a subtle gradient-like depth without
          adding another dependency.
      */}
      
      {themeName === "blossom"  && (
      
          // {(themeName === "blossom" || themeName === "light" || themeName === "sleek") && (
      
      
        <View
          pointerEvents="none"
          style={styles.blossomAtmosphere}
          >
          <View
            style={[
              styles.blossomGlowTop,
              {
                backgroundColor:
                colors.primary,
              },
            ]}
            />

          <View
            style={[
              styles.blossomGlowSide,
              {
                backgroundColor:
                colors.surface,
              },
            ]}
            />

          <View
            style={[
              styles.blossomGlowTop1,
              {
                backgroundColor:
                colors.primary,
              },
            ]}
            />

          <View
            style={[
              styles.blossomGlowMid,
              {
                backgroundColor:
                colors.border,
              },
            ]}
            />

          <View
            style={[
              styles.blossomGlowMid1,
              {
                backgroundColor:
                colors.primary,
              },
            ]}
            />

          <View
            style={[
              styles.blossomGlowBottom,
              {
                backgroundColor:
                colors.border,
              },
            ]}
            />

          <View
            style={[
              styles.blossomTopLeft,
              {
                backgroundColor:
                colors.primary,
              },
            ]}
            />

          <View
            style={[
              styles.blossomBottomRight,
              {
                backgroundColor:
                colors.secondary,
              },
            ]}
            />

        </View>
      )}


      <Header
        title="NexusFly"
        onMenuPress={() =>
        navigation.dispatch(
          DrawerActions.openDrawer()
        )
        }
        onNewChatPress={() => {
          createNewConversation();
          Keyboard.dismiss();
          chatListRef.current?.scrollToTop();
        }}
        onSettingsPress={() =>
        navigation.navigate(
          "Settings" as never
        )
        }
        />


      <View style={styles.chatWrapper}>
        <ChatList
          ref={chatListRef}
          flatListRef={flatListRef}
          messages={messages}
          isLoading={isLoading}
          setInputText={setInputText}
          composerHeight={composerHeight}
          renderItem={({
            item,
            index,
          }) => (
            <MessageRow
              item={item}
              isLastAssistant={
              index === messages.length - 1 &&
              item.role === "assistant"
              }
              handleRegenerate={
              handleRegenerate
              }
              />
          )}
          />

        <Composer
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          isLoading={isLoading}
          webSearchEnabled={
          webSearchEnabled
          }
          onToggleWebSearch={() =>
          setWebSearchEnabled(
            !webSearchEnabled
          )
          }
          onLayout={
          handleComposerLayout
          }
          />
      </View>
    </SafeAreaView>
  );
}


  const createStyles = (colors: any, 
  useGradient: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: useGradient
    ?"transparent"
      : colors.background,
    },

    chatWrapper: {
      flex: 1,
      zIndex: 1,
    },

    // ---------------------------------
    // BLOSSOM ATMOSPHERE
    // ---------------------------------

    blossomAtmosphere: {
      ...StyleSheet.absoluteFillObject,
      overflow: "hidden",
      zIndex: 0,
    },

    blossomGlowTop: {
      position: "absolute",
      width: 420,
      height: 420,
      borderRadius: 310,
      top: -250,
      left: -80,
      opacity: 0.10,
    },

    blossomGlowTop1: {
      position: "absolute",
      width: 420,
      height: 420,
      borderRadius: 310,
      top: -250,
      right: -150,
      opacity: 0.20,
    },

    blossomGlowSide: {
      position: "absolute",
      width: 140,
      height: 140,
      borderRadius: 310,
      top: 220,
      left: -65,
      opacity: 0.1,
    },

    blossomGlowMid: {
      position: "absolute",
      width: 620,
      height: 620,
      borderRadius: 360,
      bottom: -100,
      right: 150,
      opacity: 0.50,
    },

    blossomGlowMid1: {
      position: "absolute",
      width: 620,
      height: 620,
      borderRadius: 360,
      top: -100,
      left: 220,
      opacity: 0.4,
    },


    blossomGlowBottom: {
      position: "absolute",
      width: 80,
      height: 80,
      borderRadius: 360,
      top: 360,
      left: 260,
      opacity: 0.10,
    },

    blossomTopLeft: {
      position: "absolute",
      width: 420,
      height: 420,
      borderRadius: 310,
      top: -150,
      left: -220,
      opacity: 0.10,
    },

    blossomBottomRight: {
      position: "absolute",
      width: 420,
      height: 420,
      borderRadius: 310,
      bottom: -150,
      left: 120,
      opacity: 0.10,
    },

  });