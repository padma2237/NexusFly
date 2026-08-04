import React from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
} from "react-native";

import { useComposerTheme } from "../config/useComposerTheme";

import styles from "../styles";
import { ComposerInputProps } from "../types";


export default function ComposerInput({
  value,
  inputHeight,
  scrollEnabled,
  isExpanded,
  onChangeText,
  onContentHeightChange,
  onFocus,
  onBlur,
}: ComposerInputProps) {
  const theme = useComposerTheme();

  // FIX: Reset height back to initial baseline whenever value is cleared
  const handleContentSizeChange = (
  e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
) => {
  const height = e.nativeEvent.contentSize.height;
  onContentHeightChange(height);
};

  return (
    <TextInput
      value={value}
      multiline
      scrollEnabled={scrollEnabled}
      underlineColorAndroid="transparent"
      
      placeholder="Message NexusFly..."
      placeholderTextColor={theme.placeholder}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      onContentSizeChange={handleContentSizeChange}
      
      
      style={[
  styles.input,
  {
    color: theme.text,
    height: "100%",
minHeight: inputHeight,
maxHeight: inputHeight,
    

    textAlignVertical: isExpanded ? "top" : "center",

    paddingTop: isExpanded ? 4 : 0,
    paddingBottom: isExpanded ? 2 : 0,
  },
]}
    />
  );
}
