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
  Mic,
  Send
} from "lucide-react-native";

import WebSearchToggle from "./WebSearchToggle";

import {
  useTheme
} from "../theme/useTheme";


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

  return (
    <View
      style={styles.container}
      onLayout={(e) =>
      onHeightChange?.(e.nativeEvent.layout.height)
      }
      >
      <View style={styles.leftButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <Mic color="#a78bfa" size={22} />
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
        style={[
          styles.sendButton,
          isLoading && { opacity: 0.6 },
        ]}
        disabled={isLoading}
        onPress={onSend}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ): (
          <Send color="#fff" size={18} />
        )}
      </TouchableOpacity>
    </View>
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

      paddingHorizontal: 10,
      paddingVertical: 8,

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
      paddingHorizontal: 14,
      fontSize: 16,
      lineHeight: 22,
      maxHeight: 120,
    },

    iconButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },

    sendButton: {

      width: 46,
      height: 46,
      borderRadius: 23,

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
    },

  });