import React from "react";
import { View, LayoutChangeEvent } from "react-native";

import MessageItem from "./MessageItem";
import { Message } from "../../types/chat";

interface MessageRowProps {
  item: Message;
  isLastAssistant: boolean;
  handleRegenerate: () => void;
  onLayout: (
    id: string,
    y: number,
    height: number
  ) => void;
}

const MessageRow = React.memo(
  ({
    item,
    isLastAssistant,
    handleRegenerate,
    onLayout,
  }: MessageRowProps) => {

    const handleLayout = (event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout;

      onLayout(item.id, y, height);
    };

    return (
      <View onLayout={handleLayout}>
        <MessageItem
          message={item}
          onRegenerate={
            isLastAssistant
              ? handleRegenerate
              : undefined
          }
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.text === nextProps.item.text &&
      prevProps.isLastAssistant ===
        nextProps.isLastAssistant
    );
  }
);

export default MessageRow;