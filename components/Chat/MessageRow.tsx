import React from "react";
import { View } from "react-native";

import MessageItem from "./MessageItem";
import { Message } from "../../types/chat";

interface MessageRowProps {
  item: Message;
  isLastAssistant: boolean;
  handleRegenerate: () => void;
  handleEdit: (message: Message) => void;
}

const MessageRow = React.memo(
  ({
    item,
    isLastAssistant,
    handleRegenerate,
    handleEdit,
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
          onEdit={
            item.role === "user"
              ? () => handleEdit(item)
              : undefined
          }
        />
      </View>
    );
  }
);

export default MessageRow;