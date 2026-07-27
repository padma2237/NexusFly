import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";

import {
  MAX_INPUT_HEIGHT,
  MIN_INPUT_HEIGHT,
  MULTILINE_THRESHOLD,
} from "../config/constants";

export default function useComposerState() {
  /*
  |--------------------------------------------------------------------------
  | Internal State
  |--------------------------------------------------------------------------
  */

  const [inputHeight, setInputHeight] =
    useState(MIN_INPUT_HEIGHT);
    

  /*
  |--------------------------------------------------------------------------
  | Derived State
  |--------------------------------------------------------------------------
  */
  
  const isMultiline =
  inputHeight > MULTILINE_THRESHOLD;

  const isExpanded =  isMultiline;

  const scrollEnabled =
    inputHeight >= MAX_INPUT_HEIGHT;

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  */

  const focus = () => { };

  const blur = () => {
  };

  const updateContentHeight = (
    height: number
  ) => {
    const nextHeight = Math.max(
      MIN_INPUT_HEIGHT,
      Math.min(MAX_INPUT_HEIGHT, height)
    );

    setInputHeight(nextHeight);
    
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