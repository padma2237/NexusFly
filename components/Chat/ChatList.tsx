
import React, { useCallback } from "react";
import {
  FlatList,
  Platform,
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

onMessageLayout: (
  id: string,
  y: number,
  height: number
) => void;
  
  onContentSizeChange?: (height: number) => void;
  shouldScrollToLatest?: boolean;
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
  
listHeight: number;

  setInputText: (text: string) => void;
}

export default function ChatList({
  flatListRef,
  messages,
  isLoading,
  renderItem,
  contentHeight,
  isUserNearBottom,
  scrollToLatest,
  setInputText,
  onMessageLayout,
  onContentSizeChange,
  shouldScrollToLatest,
  listHeight,
}: ChatListProps) {
  
  
  const renderEmpty = useCallback(
  () => (
    <EmptyState
      onPromptPress={setInputText}
    />
  ),
  [setInputText]
);

const handleScroll = (
  event: NativeSyntheticEvent<NativeScrollEvent>
) => {
  const {
    layoutMeasurement,
    contentOffset,
    contentSize,
  } = event.nativeEvent;

  isUserNearBottom.current =
    layoutMeasurement.height +
      contentOffset.y >=
    contentSize.height - 120;
};
  
  
  return (
    <FlatList
      ref={flatListRef}
      
      data={messages}
      

onScrollToIndexFailed={(info) => {
  flatListRef.current?.scrollToOffset({
    offset: info.averageItemLength * info.index,
    animated: false,
  });

  setTimeout(() => {
    flatListRef.current?.scrollToIndex({
      index: info.index,
      animated: true,
      viewPosition: 0,
    });
  }, 100);
}}
      
      keyExtractor={(item) => item.id}
      initialNumToRender={12}
      maxToRenderPerBatch={8}
      windowSize={7}
      removeClippedSubviews={Platform.OS === "android"}
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
        paddingBottom: Math.max(200, listHeight),
      }}
      
      onScroll={handleScroll}
      
    
      
    
ListFooterComponent={
  <View style={{ paddingBottom: 50 }}>
    {isLoading ? <TypingIndicator /> : null}
  </View>
}

      
      
      onContentSizeChange={(w, h) => {
        contentHeight.current = h;
        
        
        
        if (onContentSizeChange) {
    onContentSizeChange(h);
  }
        console.log(
    "CONTENT SIZE",
    h,
    "loading:",
    isLoading
  );
  
      }}
    />
  );
}