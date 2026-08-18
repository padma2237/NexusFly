import React, { useMemo } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import { useTheme } from "../theme/useTheme";

export default function TypingIndicator() {
  const { colors } = useTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color={colors.primary}
      />

      <Text style={styles.text}>
        NexusFly is thinking...
      </Text>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
      marginBottom: 12,
    },

    text: {
      marginLeft: 10,
      color: colors.textSecondary,
      fontSize: 14,
    },
  });