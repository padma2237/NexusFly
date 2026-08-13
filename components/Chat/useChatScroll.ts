import { useCallback, useRef } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { Message } from "../../types/chat";

interface UseChatScrollProps {
  flatListRef: React.RefObject<FlatList<Message>>;
}

export default function useChatScroll({
  flatListRef,
}: UseChatScrollProps) {
  const isUserNearBottom = useRef(true);

  /**
   * Track whether the user is close to the bottom.
   */
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
    []
  );

  /**
   * Scroll to a particular message.
   *
   * viewPosition 0.35 means the message is positioned
   * around 35% down the visible FlatList area.
   */
  const scrollToMessage = useCallback(
    (index: number) => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.35,
          });
        }, 50);
      });
    },
    [flatListRef]
  );

  /**
   * Scroll to the newest content.
   */
  const scrollToLatest = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({
          animated: true,
        });
      });
    });
  }, [flatListRef]);
  
  const scrollToTop = useCallback(() => {
  requestAnimationFrame(() => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  });
}, [flatListRef]);
  
  

  /**
   * FlatList sometimes hasn't rendered the requested
   * item yet. Move approximately to it, then retry.
   */
  const handleScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      averageItemLength: number;
    }) => {
      flatListRef.current?.scrollToOffset({
        offset:
          info.averageItemLength * info.index,
        animated: false,
      });

      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: info.index,
          animated: true,
          viewPosition: 0.35,
        });
      }, 100);
    },
    [flatListRef]
  );

  return {
    isUserNearBottom,
    handleScroll,
    
    scrollToMessage,
    scrollToLatest,
    scrollToTop,
    handleScrollToIndexFailed,
  };
}