import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  useTheme
} from "../theme/useTheme";

export default function SettingsScreen() {
  const {
    themeName,
    setTheme,
    colors
  } = useTheme();

  const themes = [{
    id: "system",
    title: "📱 System",
  },
    {
      id: "dark",
      title: "🌑 Dark",
    },
    {
      id: "light",
      title: "☀️ Light",
    },
    {
      id: "experimental",
      title: "🧪 Padma Experimental",
    },
    {
      id: "aurora",
      title: "🌌 Aurora",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      >
      <Text
        style={[
          styles.heading,
          {
            color: colors.text,
          },
        ]}
        >
        Appearance
      </Text>

      {themes.map((theme) => (
        <TouchableOpacity
          key={theme.id}
          style={[
            styles.button,
            {
              backgroundColor:
              themeName === theme.id
              ? colors.primary: colors.surface,
            },
          ]}
          onPress={() => setTheme(theme.id as any)}
          >
          <Text
            style={[
              styles.buttonText,
              {
                color: colors.text,
              },
            ]}
            >
            {theme.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },

    heading: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 24,
    },

    button: {
      padding: 18,
      borderRadius: 16,
      marginBottom: 14,
    },

    buttonText: {
      fontSize: 18,
      fontWeight: "600",
    },
  });