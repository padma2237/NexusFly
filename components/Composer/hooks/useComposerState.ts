import { useState, useCallback } from "react";
import {
  MAX_INPUT_HEIGHT,
  MIN_INPUT_HEIGHT,
} from "../config/constants";

const EXPAND_THRESHOLD = 34;
const COLLAPSE_THRESHOLD = 22;

export default function useComposerState() {
  const [inputHeight, setInputHeight] =
    useState(MIN_INPUT_HEIGHT);

  const [isExpanded, setIsExpanded] =
    useState(false);

  const updateContentHeight = useCallback((height: number) => {
    const nextHeight = Math.max(
      MIN_INPUT_HEIGHT,
      Math.min(MAX_INPUT_HEIGHT, height)
    );

    setInputHeight(nextHeight);

    setIsExpanded((prevExpanded) => {
      if (!prevExpanded && nextHeight >= EXPAND_THRESHOLD) {
        return true;
      }

      if (prevExpanded && nextHeight <= COLLAPSE_THRESHOLD) {
        return false;
      }

      return prevExpanded;
    });
  }, []);

  const reset = useCallback(() => {
    setInputHeight(MIN_INPUT_HEIGHT);
    setIsExpanded(false);
  }, []);

  const isMultiline = isExpanded;

  const scrollEnabled =
    inputHeight >= MAX_INPUT_HEIGHT;

  return {
    state: {
      inputHeight,
      isExpanded,
      isMultiline,
      scrollEnabled,
    },

    actions: {
      updateContentHeight,
      reset,
    },
  };
}