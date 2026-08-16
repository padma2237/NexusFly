import { useCallback, useRef } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { Message } from "../../types/chat";

interface UseChatScrollProps {
  flatListRef: React.RefObject<FlatList<Message>>;
  messages: Message[];
}

export default function useChatScroll({
  flatListRef,
  messages,
}: UseChatScrollProps) {
  const isUserNearBottom = useRef(true);

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
   * Put the requested message around the requested
   * percentage of the visible screen.
   *
   * 0.30 = message starts around 30% from top.
   */
  const scrollToMessage = useCallback(
    (
      index: number,
      viewPosition: number = 0.30
    ) => {
      if (!messages[index]) return;

      let cancelled = false;

      const attempt = (tries = 0) => {
        if (cancelled) return;

        const list = flatListRef.current;

        if (!list) {
          if (tries < 30) {
            setTimeout(() => attempt(tries + 1), 50);
          }
          return;
        }

        try {
          list.scrollToIndex({
            index,
            animated: true,
            viewPosition,
            viewOffset: 0,
          });
        } catch {
          if (tries < 30) {
            setTimeout(() => attempt(tries + 1), 50);
          }
        }
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          attempt();
        });
      });

      return () => {
        cancelled = true;
      };
    },
    [flatListRef, messages]
  );

  /**
   * Show the newest content.
   */
  const scrollToLatest = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({
          animated: false,
        });
      });
    });
  }, [flatListRef]);

  /**
   * Go to beginning.
   */
  const scrollToTop = useCallback(() => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    });
  }, [flatListRef]);

  /**
   * If FlatList hasn't measured the new item yet,
   * retry after it has rendered.
   */
  const handleScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      averageItemLength: number;
    }) => {
      const list = flatListRef.current;

      if (!list) return;

      list.scrollToOffset({
        offset: Math.max(
          0,
          info.averageItemLength * info.index
        ),
        animated: false,
      });

      setTimeout(() => {
        list.scrollToIndex({
          index: info.index,
          animated: true,
          viewPosition: 0.30,
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