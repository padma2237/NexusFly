import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { useTheme } from "../../theme/useTheme";
import AnimatedToolbar from "./AnimatedToolbar";

interface Props {
  value: string;
  onChangeText: (text: string) => void;

  hasText: boolean;
  isLoading: boolean;

  onSend: () => void;
  onAttachmentPress: () => void;

  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

const MIN_INPUT_HEIGHT = 24;
const MAX_INPUT_HEIGHT = 120;

export default function ComposerInput({
  value,
  onChangeText,
  hasText,
  isLoading,
  onSend,
  onAttachmentPress,
  webSearchEnabled,
  onToggleWebSearch,
}: Props) {
  const { colors } = useTheme();

  
  const inputHeight = useSharedValue(MIN_INPUT_HEIGHT);
const expanded = useSharedValue(false);

const containerStyle = useAnimatedStyle(() => ({
  paddingBottom: withTiming(
    expanded.value ? 12 : 10,
    {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    }
  ),
}));

const toolbarStyle = useAnimatedStyle(() => ({
  marginTop: withTiming(
    expanded.value ? 10 : 0,
    {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    }
  ),
}));

const [textHeight, setTextHeight] = useState(MIN_INPUT_HEIGHT);



  const handleContentSizeChange = (
  e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
) => {
  const h = Math.max(
    MIN_INPUT_HEIGHT,
    Math.min(MAX_INPUT_HEIGHT, e.nativeEvent.contentSize.height)
  );

  setTextHeight(h);

  inputHeight.value = h;
  expanded.value = h > 28;
};
  
  

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        {
         backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline
        underlineColorAndroid="transparent"
        placeholder="Message NexusFly..."
        placeholderTextColor={colors.subText}
        onContentSizeChange={handleContentSizeChange}
        scrollEnabled={textHeight >= MAX_INPUT_HEIGHT}
        textAlignVertical="top"
        style={[
          styles.input,
          {
            color: colors.text,
            height: textHeight,
            textAlignVertical: "top",
          },
        ]}
      />

    <Animated.View style={toolbarStyle}>
  <AnimatedToolbar
    hasText={hasText}
    isLoading={isLoading}
    onSend={onSend}
    onAttachmentPress={onAttachmentPress}
    webSearchEnabled={webSearchEnabled}
    onToggleWebSearch={onToggleWebSearch}
  />


</Animated.View>
</Animated.View>

);
}
    
    



const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    borderWidth: 1,
    overflow: "hidden",

    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,

    minHeight: 56,
  },

  input: {
    fontSize: 17,
    lineHeight: 22,

    padding: 0,
    margin: 0,

    includeFontPadding: false,
  },
});