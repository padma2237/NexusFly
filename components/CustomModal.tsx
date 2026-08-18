import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { useTheme } from "../theme/useTheme";

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

  const { colors } = useTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  const [text, setText] = useState(inputValue);

  useEffect(() => {
    setText(inputValue);
  }, [inputValue, visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
onRequestClose={onCancel}
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
              placeholderTextColor={colors.subText}
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

const createStyles = (colors: any) =>
  StyleSheet.create({

    overlay: {
      flex: 1,

      backgroundColor:
        "rgba(0,0,0,0.65)",

      justifyContent: "center",
      alignItems: "center",
    },

    modal: {
      width: "85%",

      backgroundColor:
        colors.surface,

      borderRadius: 18,
      padding: 22,

      borderWidth: 1,

      borderColor:
        colors.border,
    },

    title: {
      color: colors.text,

      fontSize: 22,
      fontWeight: "700",

      marginBottom: 12,
    },

    message: {
      color: colors.subText,

      fontSize: 15,

      marginBottom: 22,
    },

    buttons: {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
},

cancel: {
  height: 48,
  minWidth: 90,

  alignItems: "center",
  justifyContent: "center",

  marginRight: 12,
},

cancelText: {
  color: colors.subText,

  fontSize: 16,
  fontWeight: "500",
},

confirm: {
  height: 48,
  minWidth: 110,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: colors.error,

  paddingHorizontal: 18,

  borderRadius: 12,
},

    confirmText: {
      color: colors.text,

      fontWeight: "700",
    },

    input: {
      backgroundColor:
        colors.background,

      color: colors.text,

      borderRadius: 10,

      paddingHorizontal: 14,
      paddingVertical: 12,

      marginBottom: 20,

      borderWidth: 1,

      borderColor:
        colors.border,
    },

  });