import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import Colors from "../constants/colors";

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;

  confirmText: string;
  cancelText: string;

  onConfirm: (value?: string) => void;
  onCancel: () => void;

  showInput?: boolean;
  inputValue?: string;
  inputPlaceholder?: string;
}

export default function CustomModal({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  showInput = false,
  inputValue = "",
  inputPlaceholder = "Enter name",
}: CustomModalProps) {
  
const [text, setText] = useState(inputValue);

useEffect(() => {
  setText(inputValue);
}, [inputValue, visible]);

  
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>
          
          {showInput && (
  <TextInput
    style={styles.input}
    value={text}
    onChangeText={setText}
    placeholder={inputPlaceholder}
    placeholderTextColor="#64748b"
  />
)}

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={onCancel}
              >
              <Text style={styles.cancelText}>
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirm}
              onPress={() => onConfirm(text)}
              >
              <Text style={styles.confirmText}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.65)",
      justifyContent: "center",
      alignItems: "center",
    },

    modal: {
      width: "85%",
      backgroundColor: "#111827",
      borderRadius: 18,
      padding: 22,
    },

    title: {
      color: "white",
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 12,
    },

    message: {
      color: "#cbd5e1",
      fontSize: 15,
      marginBottom: 22,
    },

    buttons: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },

    cancel: {
      marginRight: 12,
    },

    cancelText: {
      color: "#94a3b8",
      fontSize: 16,
    },

    confirm: {
      backgroundColor: "#ef4444",
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 10,
    },

    confirmText: {
      color: "white",
      fontWeight: "700",
    },
    
    input: {
  backgroundColor: "#1f2937",
  color: "white",
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: 12,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "#374151",
},
  });