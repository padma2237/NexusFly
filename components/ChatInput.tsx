import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Mic, Send } from "lucide-react-native";
import Colors from "../constants/colors";

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChangeText,
  onSend,
  isLoading,
}: ChatInputProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        <Mic color="#a78bfa" size={22} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Message NexusFly..."
        placeholderTextColor={Colors.subText}
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
        ) : (
          <Send color="#fff" size={18} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: Colors.surface,
    margin: 16,
    padding: 8,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  input: {
    flex: 1,
    color: Colors.text,
    paddingHorizontal: 12,
    maxHeight: 120,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.border,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
});