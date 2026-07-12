import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import Colors from "../constants/colors";
import {
  Message
} from "../types/chat";
import Markdown from "react-native-markdown-display";


interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({
  message
}: ChatBubbleProps) {
  const isUser = message.role === "user";
  
  
  
  const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble: styles.aiBubble,
      ]}>

      {isUser ? (
        <Text style={styles.text}>{message.text}</Text>
      ): (
        <>
          <Markdown style={markdownStyles}>
            {message.text}
          </Markdown>

          {message.sources && message.sources.length > 0 && (
            <>
              
              
      <Text style={styles.sourceTitle}>
  📚 Sources
</Text>

{message.sources.map((source, index) => (
  <Pressable
    key={index}
    style={styles.sourceCard}
    onPress={() => Linking.openURL(source.url)}
  >
    <Text style={styles.sourceName}>
      🌐 {source.title}
    </Text>

    <Text style={styles.sourceDomain}>
      {getDomain(source.url)}
    </Text>
  </Pressable>
))}
         </>
      )}
    </>
   )}

    </View>
  );
}

  const styles = StyleSheet.create({
    bubble: {
      maxWidth: "90%",
      padding: 14,
      borderRadius: 20,
      marginBottom: 16,
    },

    userBubble: {
      alignSelf: "flex-end",
      backgroundColor: Colors.primary,
      borderBottomRightRadius: 6,
    },

    aiBubble: {
      alignSelf: "flex-start",
      backgroundColor: Colors.surface,
      borderBottomLeftRadius: 6,
      borderWidth: 1,
      borderColor: Colors.border,
    },

    text: {
      color: Colors.text,
      fontSize: 16,
      lineHeight: 24,
    },

    sourceTitle: {
      color: Colors.text,
      fontWeight: "bold",
      marginTop: 14,
      marginBottom: 8,
    },

  sourceCard: {
  backgroundColor: "#0f172a",
  borderRadius: 12,
  padding: 12,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "#1e293b",
},

sourceName: {
  color: Colors.text,
  fontWeight: "bold",
  fontSize: 15,
},

sourceDomain: {
  color: "#94a3b8",
  marginTop: 4,
  fontSize: 13,
},

  });
  const markdownStyles = StyleSheet.create ( {
    body: {
      color: Colors.text,
      fontSize: 16,
      lineHeight: 24,
    },

    heading1: {
      color: Colors.text,
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
    },

    heading2: {
      color: Colors.text,
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },

    code_inline: {
      backgroundColor: "#1e293b",
      color: "#38bdf8",
      paddingHorizontal: 4,
      borderRadius: 4,
    },

    code_block: {
      backgroundColor: "#0f172a",
      color: "#38bdf8",
      padding: 12,
      borderRadius: 10,
    },

    bullet_list: {
      color: Colors.text,
    },

    ordered_list: {
      color: Colors.text,
    },

    strong: {
      color: Colors.text,
      fontWeight: "bold",
    },

    em: {
      color: Colors.text,
      fontStyle: "italic",
    },
    
  });