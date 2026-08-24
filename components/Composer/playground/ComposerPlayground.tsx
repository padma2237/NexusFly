import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import Composer from "../Composer";

export default function ComposerPlayground() {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} />

      <Composer
      currentConversationId={null}
        value={text}
        onChangeText={setText}
        isLoading={false}
        webSearchEnabled={false}
        onSend={() => {
          console.log("SEND:", text);
          setText("");
        }}
        
        onToggleWebSearch={() =>
          console.log("Toggle Search")
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },

  content: {
    flex: 1,
  },
});