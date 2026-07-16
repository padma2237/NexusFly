import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
  Share,
  Keyboard,
  BackHandler,
} from "react-native";

import Animated, {
  
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";

import * as Clipboard from "expo-clipboard";

import { useTheme } from "../theme/useTheme";

import {
  Message
} from "../types/chat";
import Markdown from "react-native-markdown-display";

import {
  useEffect,
  useRef
} from "react";
import {
  BottomSheetModal
} from "@gorhom/bottom-sheet";
import MessageActionSheet from "./MessageActionSheet";



interface ChatBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

function ChatBubble({
  message,
  onRegenerate,
}: ChatBubbleProps) {
  const isUser = message.role === "user";
  const { colors } = useTheme();
  
  const styles = React.useMemo(
  () => createStyles(colors),
  [colors]
);

const markdownStyles = React.useMemo(
  () => createMarkdownStyles(colors),
  [colors]
);
  
  const sheetRef = useRef < BottomSheetModal > (null);

  const [isSheetOpen,
    setIsSheetOpen] = React.useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isSheetOpen) {
          sheetRef.current?.dismiss();
          return true;
        }

        return false;
      }
    );

    return () => subscription.remove();
  }, [isSheetOpen]);


  const copyMessage = async () => {
    await Clipboard.setStringAsync(message.text);
  };

  const shareMessage = async () => {
    try {
      await Share.share({
        message: message.text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showMenu = () => {
    Alert.alert(
      "Message",
      "Choose an action",
      [{
        text: "📋 Copy",
        onPress: () => {
          copyMessage();
        },
      },
        {
          text: "📤 Share",
          onPress: () => {
            shareMessage();
          },
        },
        ...(onRegenerate
          ? [{
            text: "🔄 Regenerate",
            onPress: onRegenerate,
          },
          ]: []),
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <>
    
     <Animated.View
  entering={
    isUser
      ? FadeInRight.springify().damping(50)
      : FadeInLeft.springify().damping(50)
  }
>
       
  <Pressable
        onLongPress={
        !isUser
        ? () => {
          Keyboard.dismiss();

          setTimeout(() => {
            sheetRef.current?.present();
          },
            120);
        }: undefined
        }
        delayLongPress={350}
        style={[
          styles.bubble,
          isUser ? styles.userBubble: styles.aiBubble,
        ]}
        >
        {isUser ? (
          <Text style={styles.text}>{message.text}</Text>
        ): (
          <>
            <Markdown
              style={markdownStyles}
              mergeStyle={true}
              >
              {message.text}
            </Markdown>

            {message.sources && message.sources.length > 0 && (
              <>
                <Text style={styles.sourceTitle}>
                  📚 Sources
                </Text>

                {message.sources.map((source, index) => (
                  <Pressable
                    key={index}
                    style={styles.sourceCard}
                    onPress={() => Linking.openURL(source.url)}
                    >
                    <Text style={styles.sourceName}>
                      🌐 {source.title}
                    </Text>

                    <Text style={styles.sourceDomain}>
                      {getDomain(source.url)}
                    </Text>
                  </Pressable>
                ))}
              </>
            )}
          </>
        )}
      </Pressable>
      </Animated.View>

      <MessageActionSheet
        ref={sheetRef}
        onCopy={copyMessage}
        onShare={shareMessage}
        onRegenerate={onRegenerate}
        onChange={(index) => setIsSheetOpen(index >= 0)}
        />
    </>
  );
}



const createStyles = (colors: any) =>
  StyleSheet.create({
    bubble: {
      maxWidth: "90%",
      padding: 14,
      borderRadius: 20,
      marginBottom: 16,
    },

    userBubble: {
      alignSelf: "flex-end",
      backgroundColor: colors.primary,
      borderBottomRightRadius: 6,
    },

    aiBubble: {
      alignSelf: "flex-start",
      backgroundColor: colors.surface,
      borderBottomLeftRadius: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },

    text: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 24,
    },

    sourceTitle: {
      color: colors.text,
      fontWeight: "bold",
      marginTop: 14,
      marginBottom: 8,
    },

    sourceCard: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },

    sourceName: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 15,
    },

    sourceDomain: {
      color: colors.subText,
      marginTop: 4,
      fontSize: 13,
    },
  });

const createMarkdownStyles = (colors: any) =>
  StyleSheet.create({
    body: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 24,
    },

    heading1: {
      color: colors.text,
    },

    heading2: {
      color: colors.text,
    },

    strong: {
      color: colors.text,
    },

    em: {
      color: colors.text,
    },

    bullet_list: {
      color: colors.text,
    },

    ordered_list: {
      color: colors.text,
    },

    code_inline: {
      backgroundColor: colors.background,
      color: colors.primary,
      paddingHorizontal: 4,
      borderRadius: 4,
    },

    code_block: {
      backgroundColor: colors.background,
      color: colors.primary,
      padding: 12,
      borderRadius: 10,
    },
  });

export default React.memo(ChatBubble);