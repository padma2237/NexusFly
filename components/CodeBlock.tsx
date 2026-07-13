import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";

interface Props {
  code: string;
  language?: string;
}

export default function CodeBlock({
  code,
  language = "Code",
}: Props) {
  const copyCode = async () => {
    await Clipboard.setStringAsync(code);
    Alert.alert("Copied", "Code copied to clipboard.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>
          {language}
        </Text>

        <Pressable onPress={copyCode}>
          <Text style={styles.copy}>
            📋 Copy
          </Text>
        </Pressable>
      </View>

      <Text style={styles.code}>
        {code}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  language: {
    color: "#94a3b8",
    fontWeight: "bold",
  },

  copy: {
    color: "#38bdf8",
    fontWeight: "bold",
  },

  code: {
    color: "#f8fafc",
    fontFamily: "monospace",
    padding: 14,
    lineHeight: 22,
  },
});