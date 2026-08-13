
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import {
  FlatList,
  View,
} from "react-native";

import EmptyState from "../EmptyState";
import TypingIndicator from "../TypingIndicator";

import { Message } from "../../types/chat";
import useChatScroll from "./useChatScroll";

export interface ChatListHandle {
  scrollToMessage: (index: number) => void;
  scrollToLatest: () => void;
  scrollToTop: () => void;
}

interface ChatListProps {
  flatListRef: React.RefObject<FlatList<Message>>;
  messages: Message[];

  isLoading: boolean;
  composerHeight: number;

  renderItem: ({
    item,
    index,
  }: {
    item: Message;
    index: number;
  }) => React.ReactElement;

  setInputText: (text: string) => void;

  onContentSizeChange?: (height: number) => void;
}

const ChatList = forwardRef<ChatListHandle, ChatListProps>(
  ({
  flatListRef,
  messages,
  isLoading,
  renderItem,
  setInputText,
  composerHeight,
  
    onContentSizeChange,
}, ref) => {
  
  
  
  
  const {
  handleScroll,
  handleScrollToIndexFailed,
  scrollToMessage,
  scrollToLatest,
  scrollToTop,
} = useChatScroll({
  flatListRef,
  });
  
  useImperativeHandle(
    ref,
    () => ({
      scrollToMessage,
      scrollToLatest,
      scrollToTop,
    }),
    [scrollToMessage, scrollToLatest, scrollToTop]
  );
  
  const renderEmpty = useCallback(
    () => (
      <EmptyState
        onPromptPress={setInputText}
      />
    ),
    [setInputText]
  );

  return (
    <FlatList
      ref={flatListRef}

      data={messages}

      keyExtractor={(item) => item.id}

      initialNumToRender={12}
      maxToRenderPerBatch={8}
      windowSize={7}

      removeClippedSubviews={false}

      keyboardShouldPersistTaps="handled"

      scrollEventThrottle={16}

      renderItem={({ item, index }) =>
        renderItem({
          item,
          index,
        })
      }

      ListEmptyComponent={renderEmpty}

      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingBottom: composerHeight + 24,
      }}

      onScroll={handleScroll}

      onContentSizeChange={onContentSizeChange}

      onScrollToIndexFailed={handleScrollToIndexFailed}

      ListFooterComponent={
        <View>
          {isLoading ? <TypingIndicator /> : null}
        </View>
      }
          />
  );
});

export default ChatList;
    