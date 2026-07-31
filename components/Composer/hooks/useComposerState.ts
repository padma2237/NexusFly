import { useRef, useState } from "react";
import {
  MAX_INPUT_HEIGHT,
  MIN_INPUT_HEIGHT,
} from "../config/constants";

export default function useComposerState() {
  const [inputHeight, setInputHeight] =
    useState(MIN_INPUT_HEIGHT);

  const expandedRef = useRef(false);

  /*
  |--------------------------------------------------------------------------
  | Expansion thresholds
  |--------------------------------------------------------------------------
  |
  | Use hysteresis:
  |
  | 34px -> expand
  | 22px -> collapse
  |
  | This prevents the layout from switching back and forth when
  | TextInput reports slightly different heights around line 2.
  |
  */

  const EXPAND_THRESHOLD = 34;
  const COLLAPSE_THRESHOLD = 22;

  /*
  |--------------------------------------------------------------------------
  | Derived state
  |--------------------------------------------------------------------------
  */

  if (!expandedRef.current && inputHeight >= EXPAND_THRESHOLD) {
    expandedRef.current = true;
  } else if (
    expandedRef.current &&
    inputHeight <= COLLAPSE_THRESHOLD
  ) {
    expandedRef.current = false;
  }

  const isExpanded = expandedRef.current;

  const isMultiline = isExpanded;

  const scrollEnabled =
    inputHeight >= MAX_INPUT_HEIGHT;

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  */

  const focus = () => {};

  const blur = () => {};

  const updateContentHeight = (height: number) => {
    const nextHeight = Math.max(
      MIN_INPUT_HEIGHT,
      Math.min(MAX_INPUT_HEIGHT, height)
    );

    if (nextHeight !== inputHeight) {
      setInputHeight(nextHeight);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Public API
  |--------------------------------------------------------------------------
  */

  return {
    state: {
      inputHeight,
      isExpanded,
      isMultiline,
      scrollEnabled,
    },

    actions: {
      updateContentHeight,
      focus,
      blur,
    },
  };
}