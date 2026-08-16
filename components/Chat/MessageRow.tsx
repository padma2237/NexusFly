import React from "react";
import { View } from "react-native";

import MessageItem from "./MessageItem";
import { Message } from "../../types/chat";

interface MessageRowProps {
  item: Message;
  isLastAssistant: boolean;
  handleRegenerate: () => void;
}

const MessageRow = React.memo(
  ({
    item,
    isLastAssistant,
    handleRegenerate,
  }: MessageRowProps) => {
    return (
      <View>
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