import React from "react";
import { FlatList, Platform } from "react-native";

import EmptyState from "../EmptyState";
import TypingIndicator from "../TypingIndicator";

import { Message } from "../../types/chat";

interface ChatListProps {
  flatListRef: React.RefObject<FlatList<Message>>;
  messages: Message[];

  Height: number;
  isLoading: boolean;

  renderItem: ({
  item,
  index,
}: {
  item: Message;
  index: number;
}) => React.ReactElement;

  contentHeight: React.MutableRefObject<number>;
  isUserNearBottom: React.MutableRefObject<boolean>;

  scrollToLatest: () => void;

  setInputText: (text: string) => void;
}

export default function ChatList({
  flatListRef,
  messages,
  composerHeight,
  isLoading,
  renderItem,
  contentHeight,
  isUserNearBottom,
  scrollToLatest,
  setInputText,
}: ChatListProps) {
  return (
    <FlatList
      ref={flatListRef}
      data={messages.length === 0 ? [{ id: "empty" } as any] : messages}
      keyExtractor={(item) => item.id}
      initialNumToRender={12}
      maxToRenderPerBatch={8}
      windowSize={7}
      removeClippedSubviews={Platform.OS === "android"}
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        if (messages.length === 0) {
          return (
            <EmptyState
              onPromptPress={(prompt) => setInputText(prompt)}
            />
          );
        }

        return renderItem({
          item,
          index,
        });
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingBottom: composerHeight,
      }}
      onScroll={({ nativeEvent }) => {
        const {
          layoutMeasurement,
          contentOffset,
          contentSize,
        } = nativeEvent;

        isUserNearBottom.current =
          layoutMeasurement.height + contentOffset.y >=
          contentSize.height - 120;
      }}
      ListFooterComponent={
        isLoading ? <TypingIndicator /> : null
      }
      onContentSizeChange={(w, h) => {
        contentHeight.current = h;

        if (isLoading) {
          scrollToLatest();
        }
      }}
    />
  );
}