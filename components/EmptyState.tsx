import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useTheme } from "../theme/useTheme";

import Animated, {
  FadeInUp,
} from "react-native-reanimated";

interface Props {
  onPromptPress: (prompt: string) => void;
}

interface Prompt {
  icon: string;
  title: string;
  color: string;
}

const PROMPT_SETS = [
  [
    {
      icon: "🌍",
      title: "Search the web",
    },
    {
      icon: "💻",
      title: "Write React Native code",
    },
    {
      icon: "📚",
      title: "Explain a concept",
    },
    {
      icon: "🎨",
      title: "Generate an image",
    },
  ],

  [
    {
      icon: "💡",
      title: "Give me a useful idea",
    },
    {
      icon: "🧑‍💻",
      title: "Help me debug my code",
    },
    {
      icon: "📝",
      title: "Help me understand something",
    },
    {
      icon: "🚀",
      title: "Help me build something",
    },
  ],

  [
    {
      icon: "🔎",
      title: "Find something interesting",
    },
    {
      icon: "⚛️",
      title: "Help with React Native",
    },
    {
      icon: "🧠",
      title: "Teach me something new",
    },
    {
      icon: "✨",
      title: "Give me a creative idea",
    },
  ],

  [
    {
      icon: "🌐",
      title: "What's happening today?",
    },
    {
      icon: "🛠️",
      title: "Fix a coding problem",
    },
    {
      icon: "📖",
      title: "Explain something simply",
    },
    {
      icon: "🎯",
      title: "Help me plan my next step",
    },
  ],

  [
    {
      icon: "💭",
      title: "Let's explore an idea",
    },
    {
      icon: "🧩",
      title: "Solve a problem with me",
    },
    {
      icon: "🔬",
      title: "Explore a topic",
    },
    {
      icon: "🌱",
      title: "Help me learn something",
    },
  ],

  [
    {
      icon: "⚡",
      title: "Help me get something done",
    },
    {
      icon: "👨‍💻",
      title: "Build something with me",
    },
    {
      icon: "💬",
      title: "Let's talk about an idea",
    },
    {
      icon: "🌟",
      title: "Surprise me",
    },
  ],
];

const MOTIVATIONAL_LINES = [
  "Small steps today can become something amazing tomorrow.",
  "You don't need to know everything. Just start.",
  "One idea can be the beginning of something great.",
  "Keep learning. Keep building. Keep moving forward.",
  "Curiosity is a pretty good place to start.",
  "Progress doesn't have to be perfect.",
  "Let's make something useful today.",
  "Every problem is another chance to learn.",
  "Your next idea might be your best one yet.",
  "Build it, learn from it, improve it.",
  "A little progress is still progress.",
  "There's always something new to discover.",
];

function getTimeBlock() {
  return Math.floor(Date.now() / (3 * 60 * 60 * 1000));
}

function getRandomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

export default function EmptyState({
  onPromptPress,
}: Props) {
  const { colors } = useTheme();

  /*
   * Pick a random starting set when EmptyState appears.
   * This means reopening the app can show different content.
   */
  const [timeBlock, setTimeBlock] = useState(
    getTimeBlock()
  );

  const [randomSet, setRandomSet] = useState(
    () => getRandomIndex(PROMPT_SETS.length)
  );

  /*
   * Check for a new 3-hour block.
   *
   * This allows the content to change even if the
   * EmptyState remains mounted on screen.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const currentBlock = getTimeBlock();

      setTimeBlock((previousBlock) => {
        if (currentBlock !== previousBlock) {
          setRandomSet(
            getRandomIndex(PROMPT_SETS.length)
          );

          return currentBlock;
        }

        return previousBlock;
      });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const prompts = useMemo<Prompt[]>(() => {
    const selectedSet =
      PROMPT_SETS[randomSet % PROMPT_SETS.length];

    return selectedSet.map((item, index) => ({
      ...item,
      color: [
        colors.cardGreen,
        colors.cardBlue,
        colors.cardOrange,
        colors.cardPurple,
      ][index],
    }));
  }, [
    randomSet,
    timeBlock,
    colors.cardGreen,
    colors.cardBlue,
    colors.cardOrange,
    colors.cardPurple,
  ]);

  /*
   * Motivational line changes together with the
   * 3-hour content rotation.
   */
  const motivationalLine = useMemo(() => {
    const index =
      Math.abs(timeBlock) %
      MOTIVATIONAL_LINES.length;

    return MOTIVATIONAL_LINES[index];
  }, [timeBlock]);

  /*
   * Greeting based on current time.
   */
  const hour = new Date().getHours();

  let greeting = "👋 Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "☀️ Good Afternoon";
  } else if (hour >= 17 && hour < 22) {
    greeting = "🌙 Good Evening";
  } else if (hour >= 22 || hour < 5) {
    greeting = "🌙 Good Night";
  }

  return (
    <View style={styles.container}>

      {/* Greeting */}
      <Text
        style={[
          styles.greeting,
          {
            color: colors.text,
          },
        ]}
      >
        {greeting}
      </Text>

      {/* Motivational / connection line */}
      <Text
        style={[
          styles.subtitle,
          {
            color: colors.subText,
          },
        ]}
      >
        {motivationalLine}
      </Text>

      {/* Main question */}
      <Text
        style={[
          styles.question,
          {
            color: colors.text,
          },
        ]}
      >
        How can I help today?
      </Text>

      {/* Dynamic prompts */}
      {prompts.map((item, index) => (
        <Animated.View
          key={`${item.title}-${randomSet}`}
          entering={FadeInUp
            .delay(index * 100)
            .springify()}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              onPromptPress(item.title)
            }
            style={[
              styles.card,
              {
                backgroundColor: item.color,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.cardContent}>

              <Text
                style={[
                  styles.cardText,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {item.icon} {item.title}
              </Text>

              <Text
                style={[
                  styles.arrow,
                  {
                    color: colors.subText,
                  },
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

  greeting: {
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    paddingHorizontal: 15,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 23,
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

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardText: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
  },

  arrow: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
  },
});