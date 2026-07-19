import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";
import Animated, {
  FadeInUp,
} from "react-native-reanimated";

interface Props {
  onPromptPress: (prompt: string) => void;
}

export default function EmptyState({ onPromptPress }: Props) {
  const { colors } = useTheme();

 const prompts = [
  {
    icon: "🌍",
    title: "Search the web",
    color: colors.cardGreen,
  },
  {
    icon: "💻",
    title: "Write React Native code",
    color: colors.cardBlue,
  },
  {
    icon: "📚",
    title: "Explain a concept",
    color: colors.cardOrange,
  },
  {
    icon: "🎨",
    title: "Generate an image",
    color: colors.cardPurple,
  },
];


const hour = new Date().getHours();

let greeting = "👋 Good Morning";

if (hour >= 12 && hour < 17) {
  greeting = "☀️ Good Afternoon";
} else if (hour >= 17) {
  greeting = "🌙 Good Evening";
}

 

  return (
    <View style={styles.container}>

      <Text style={[styles.greeting, { color: colors.text }]}>
  {greeting}
</Text>

    <Text
  style={[
    styles.subtitle,
    { color: colors.subText },
  ]}
>
  Ready to build, learn and explore?
</Text>

      <Text style={[styles.question, { color: colors.text }]}>
        How can I help today?
      </Text>

      {prompts.map((item, index) => (
        
        <Animated.View
        key={item.title}
  entering={FadeInUp.delay(index * 100).springify()}
>
  <TouchableOpacity
  activeOpacity={0.8}
        
          onPress={() => onPromptPress(item.title)}
          style={[
            styles.card,
            {
             backgroundColor: item.color,
              borderColor: colors.border,
            },
          ]}
        >
         
         <View style={styles.cardContent}>
  <Text style={[styles.cardText, { color: colors.text }]}>
    {item.icon} {item.title}
  </Text>

  <Text
    style={[
      styles.arrow,
      { color: colors.subText },
    ]}
  >
    →
  </Text>
</View>
         
        </TouchableOpacity>
        </Animated.View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    fontSize: 38,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
  },

  question: {
    marginTop: 60,
    marginBottom: 25,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
  },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 14,
  },

  cardText: {
    fontSize: 17,
    fontWeight: "600",
  },
  
  greeting: {
  fontSize: 34,
  fontWeight: "900",
  textAlign: "center",
},

cardContent: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

arrow: {
  fontSize: 20,
  fontWeight: "700",
},
  
});