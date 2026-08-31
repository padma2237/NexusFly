import React, { useState } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Share,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import {
  Copy,
  Share2,
  Pencil,
  Sparkles,
} from "lucide-react-native";

interface Props {
  text: string;
  onEdit?: () => void;
  onEnhance?: () => void;
}

export default function UserMessageActions({
  text,
  onEdit,
  onEnhance,
}: Props) {
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
      >
        {copied ? (
          <Text style={styles.check}>✓</Text>
        ) : (
          <Copy size={16} strokeWidth={2} />
        )}

        <Text style={styles.text}>
          {copied ? "Copied":"Copy"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={handleShare}
      >
        <Share2 size={16} strokeWidth={2} />

      <Text style={styles.text}>
          Share
        </Text>
        
      </Pressable>

      {onEdit && (
        <Pressable
          style={styles.button}
          onPress={onEdit}
        >
          <Pencil size={16} strokeWidth={2} />

          <Text style={styles.text}>
            Edit
          </Text>
        </Pressable>
      )}

      {onEnhance && (
        <Pressable
          style={styles.button}
          onPress={onEnhance}
        >
          <Sparkles size={16} strokeWidth={2} />

          <Text style={styles.text}>
            Enhance
          </Text>
        </Pressable>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 5,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal:0,
  },

  text: {
    fontSize: 13,
    marginLeft: 4,
  },

  check: {
    fontSize: 16,
    fontWeight: "600",
  },
});