import React, { useEffect } from "react"; // <-- Added useEffect
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
} from "react-native";

import { useComposerTheme } from "../config/useComposerTheme";
import { INPUT_FONT_SIZE, INPUT_LINE_HEIGHT } from "../config/constants";
import { INPUT_PADDING_TOP, INPUT_PADDING_BOTTOM } from "../config/measurements";
import styles from "../styles";
import { ComposerInputProps } from "../types";

// Define default single-line height based on your constants
const INITIAL_HEIGHT = INPUT_LINE_HEIGHT + INPUT_PADDING_TOP + INPUT_PADDING_BOTTOM;

export default function ComposerInput({
  value,
  inputHeight,
  scrollEnabled,
  onChangeText,
  onContentHeightChange,
  onFocus,
  onBlur,
}: ComposerInputProps) {
  const theme = useComposerTheme();

  // FIX: Reset height back to initial baseline whenever value is cleared
  useEffect(() => {
    if (!value || value.trim() === "") {
      onContentHeightChange(INITIAL_HEIGHT);
    }
  }, [value, onContentHeightChange]);

  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const h = e.nativeEvent.contentSize.height;
    // Only adjust height if there is actual text content
    if (value && value.trim() !== "") {
      onContentHeightChange(h);
    }
  };

  return (
    <TextInput
      value={value}
      multiline
      scrollEnabled={scrollEnabled}
      underlineColorAndroid="transparent"
      textAlignVertical="center"
      placeholder="Message..."
      placeholderTextColor={theme.placeholder}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      onContentSizeChange={handleContentSizeChange}
      style={[
        styles.input,
        {
          color: theme.text,
          height: inputHeight,
          fontSize: INPUT_FONT_SIZE,
          lineHeight: INPUT_LINE_HEIGHT,
          paddingTop: INPUT_PADDING_TOP,
          paddingBottom: INPUT_PADDING_BOTTOM,
        },
      ]}
    />
  );
}
