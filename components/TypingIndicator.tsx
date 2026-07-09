import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export default function TypingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.primary} />
      <Text style={styles.text}>
        NexusFly is thinking...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
  },

  text: {
    marginLeft: 10,
    color: Colors.textSecondary,
    fontSize: 14,
  },
});