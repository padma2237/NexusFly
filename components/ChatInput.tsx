import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";

import {
  useRef
} from "react";

import {
  BottomSheetModal
} from "@gorhom/bottom-sheet";

import AttachmentSheet from "./AttachmentSheet";

import {
  Plus,
  Mic,
  Send
} from "lucide-react-native";

import WebSearchToggle from "./WebSearchToggle";

import {
  useTheme
} from "../theme/useTheme";

import Animated, {
  FadeIn,
  FadeOut,
} from "react-native-reanimated";


interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isLoading: boolean;
  onHeightChange?: (height: number) => void;

  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}


export default function ChatInput({
  value,
  onChangeText,
  onSend,
  isLoading,
  onHeightChange,
  webSearchEnabled,
  onToggleWebSearch,

}: ChatInputProps) {
  const {
    colors
  } = useTheme();
  const styles = createStyles(colors);

  const attachmentSheetRef = useRef < BottomSheetModal > (null);



  return (
    <>
      <View
        style={styles.container}
        onLayout={(e) =>
        onHeightChange?.(e.nativeEvent.layout.height)
        }
        >
        <View style={styles.leftButtons}>

          <TouchableOpacity
            activeOpacity={0.8}

            style={styles.iconButton}
            onPress={() => attachmentSheetRef.current?.present()}
            >

            <Plus color={colors.primary} size={20} />
          </TouchableOpacity>

          <WebSearchToggle
            enabled={webSearchEnabled}
            onToggle={onToggleWebSearch}
            />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Message NexusFly..."
          placeholderTextColor={colors.subText}
          value={value}
          onChangeText={onChangeText}
          multiline
          textAlignVertical="top"
          />

        <TouchableOpacity
          activeOpacity={0.75}

          style={[
            styles.sendButton,
            (!value.trim() || isLoading) && {
              opacity: 0.5,
            },
          ]}

          disabled={isLoading || !value.trim()}
          onPress={value.trim() ? onSend: undefined}
          >


          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ): value.trim() ? (
            <Animated.View
              key="send"
              entering={FadeIn.duration(180)}
              exiting={FadeOut.duration(120)}
              >
              <Send color="#fff" size={20} />
            </Animated.View>
          ): (
            <Animated.View
              key="mic"
              entering={FadeIn.duration(180)}
              exiting={FadeOut.duration(120)}
              >
              <Mic color="#fff" size={20} />
            </Animated.View>
          )}


        </TouchableOpacity>

      </View>






      <AttachmentSheet
        ref={attachmentSheetRef}
        onCamera={() => {
          attachmentSheetRef.current?.dismiss();
        }}
        onGallery={() => {
          attachmentSheetRef.current?.dismiss();
        }}
        onFile={() => {
          attachmentSheetRef.current?.dismiss();
        }}
        onClipboard={() => {
          attachmentSheetRef.current?.dismiss();
        }}
        />
    </>

  );
}

  const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",

      left: 16,
      right: 16,
      bottom: Platform.OS === "ios" ? 8: 16,

      flexDirection: "row",
      alignItems: "flex-end",

      backgroundColor: colors.surface + "DD",

      paddingHorizontal: 8,
      paddingVertical: 5,

      borderRadius: 30,

      borderWidth: 1,
      borderColor: colors.border,

      elevation: 8,

      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 8,
      },

    },

    input: {
      flex: 1,
      color: colors.text,
      paddingHorizontal: 8,
      fontSize: 16,
      lineHeight: 22,
      maxHeight: 120,
    },

    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },

    sendButton: {

      width: 40,
      height: 40,
      borderRadius: 20,

      elevation: 4,

      shadowColor: colors.primary,
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
    },

    leftButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

  });