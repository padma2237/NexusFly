import React from "react";
import { View } from "react-native";

import ComposerInput from "./components/ComposerInput";
import LeftActions from "./components/LeftActions";
import RightActions from "./components/RightActions";

import styles from "./styles";

export default function ComposerBody(props) {
  const {
    composer,
    value,
    isLoading,
    webSearchEnabled,
    onChangeText,
    onSend,
    onAttachmentPress,
    onToggleWebSearch,
  } = props;

  const hasText = value ? value.trim().length > 0 : false;

  return (
    <View style={styles.body}>
      {/* 1. Left Actions (+) and (Globe) */}
      <LeftActions
        onAttachmentPress={onAttachmentPress}
        onToggleWebSearch={onToggleWebSearch}
        webSearchEnabled={webSearchEnabled}
      />

      {/* 2. Middle Input */}
      <View style={styles.inputContainer}>
        <ComposerInput
          value={value}
          inputHeight={composer.state.inputHeight}
          scrollEnabled={composer.state.scrollEnabled}
          isExpanded={composer.state.isExpanded}
          onChangeText={onChangeText}
          onContentHeightChange={composer.actions.updateContentHeight}
          onFocus={composer.actions.focus}
          onBlur={composer.actions.blur}
        />
      </View>

      {/* 3. Right Action - Pass hasText here */}
      <RightActions
        hasText={hasText}
        isLoading={isLoading}
        onSend={onSend}
      />
    </View>
  );
}
