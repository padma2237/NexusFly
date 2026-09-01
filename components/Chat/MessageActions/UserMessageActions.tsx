import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Share,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import {
  Copy,
  Share2,
  Pencil,
  Check,
} from "lucide-react-native";

import { useTheme } from "../../../theme/useTheme";

interface Props {
  text: string;
  onEdit?: () => void;
}

export default function UserMessageActions({
  text,
  onEdit,
}: Props) {
  const { colors } = useTheme();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      
      
      
      <Pressable
  style={styles.button}
  onPress={handleCopy}
  hitSlop={8}
>
  {copied ? (
    <Check
      size={19}
      strokeWidth={2.5}
      color={colors.text}
    />
  ) : (
    <Copy
      size={19}
      strokeWidth={2}
      color={colors.text}
    />
  )}
</Pressable>
      
      
      

      <Pressable
        style={styles.button}
        onPress={handleShare}
        hitSlop={8}
      >
        <Share2
          size={19}
          strokeWidth={2}
          color={colors.text}
        />
      </Pressable>

      {onEdit && (
        <Pressable
          style={styles.button}
          onPress={onEdit}
          hitSlop={8}
        >
          <Pencil
            size={19}
            strokeWidth={2}
            color={colors.text}
          />
        </Pressable>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  
  
  container: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  alignSelf: "flex-end",
  marginTop: 6, //4
  gap: 5, //12,
},

  button: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});