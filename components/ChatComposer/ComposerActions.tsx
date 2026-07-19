import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Plus, Mic, Send } from "lucide-react-native";
import { Keyboard } from "react-native";

import WebSearchToggle from "../WebSearchToggle";
import { useTheme } from "../../theme/useTheme";

interface Props {
  attachmentSheetRef: any;
  hasText: boolean;
  isLoading: boolean;
  onSend: () => void;
  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

export default function ComposerToolbar({
  attachmentSheetRef,
  hasText,
  isLoading,
  onSend,
  webSearchEnabled,
  onToggleWebSearch,
}: Props)


{
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  
  const openAttachmentSheet = () => {
  Keyboard.dismiss();

  const keyboardListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      attachmentSheetRef.current?.present();
      keyboardListener.remove();
    }
  );

  // If keyboard is already closed
  setTimeout(() => {
    attachmentSheetRef.current?.present();
    keyboardListener.remove();
  }, 250);
};
  
  

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <TouchableOpacity
          style={styles.circle}
          activeOpacity={0.8}
          
          onPress={openAttachmentSheet}
        >
          <Plus color={colors.primary} size={20} />
        </TouchableOpacity>

        
        <WebSearchToggle
    enabled={webSearchEnabled}
    onToggle={onToggleWebSearch}
/>
        
        
      </View>

      <TouchableOpacity
  activeOpacity={0.8}
  style={[
    styles.send,
    (!hasText || isLoading) && { opacity: 0.5 },
  ]}
  disabled={!hasText || isLoading}
  onPress={hasText ? onSend : undefined}
>
        
        {hasText ? (
          <Send color="#fff" size={20} />
        ) : (
          <Mic color="#fff" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    circle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },

    send: {
      width: 38,
      height: 38,
      borderRadius: 19,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
    },
  });