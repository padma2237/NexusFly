import React from "react";
import { View } from "react-native";

interface ChatContainerProps {
  children: React.ReactNode;
}

export default function ChatContainer({
  children,
}: ChatContainerProps) {
  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
}