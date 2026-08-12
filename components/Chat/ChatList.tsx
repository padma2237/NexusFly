import React, { useCallback } from "react";
import {
  FlatList,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import EmptyState from "../EmptyState";
import TypingIndicator from "../TypingIndicator";

import { Message } from "../../types/chat";

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

  isUserNearBottom: React.MutableRefObject<boolean>;

  setInputText: (text: string) => void;
  onContentSizeChange?: (height: number) => void;
}

export default function ChatList({
  flatListRef,
  messages,
  isLoading,
  renderItem,
  isUserNearBottom,
  setInputText,
  composerHeight,
  onContentSizeChange,
}: ChatListProps) {
  const renderEmpty = useCallback(
    () => (
      <EmptyState
        onPromptPress={setInputText}
      />
    ),
    [setInputText]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {
        layoutMeasurement,
        contentOffset,
        contentSize,
      } = event.nativeEvent;

      const distanceFromBottom =
        contentSize.height -
        (layoutMeasurement.height + contentOffset.y);

      isUserNearBottom.current =
        distanceFromBottom <= 120;
    },
    [isUserNearBottom]
  );

  return (
    <FlatList
      ref={flatListRef}

      data={messages}

      keyExtractor={(item) => item.id}

      initialNumToRender={12}
      maxToRenderPerBatch={8}
      windowSize={7}

      /*
       * Keep this disabled while we establish
       * reliable scrolling behavior.
       */
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

      onScrollToIndexFailed={(info) => {
        /*
         * FlatList may not have rendered the requested
         * item yet. First move approximately to the
         * requested area, then retry.
         */
        flatListRef.current?.scrollToOffset({
          offset: info.averageItemLength * info.index,
          animated: false,
        });

        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
            viewPosition: 0.35,
          });
        }, 100);
      }}

      ListFooterComponent={
        <View>
          {isLoading ? <TypingIndicator /> : null}
        </View>
      }
    />
  );
}