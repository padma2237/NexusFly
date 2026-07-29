import React from "react";
import { View } from "react-native";

import ComposerInput from "./components/ComposerInput";
import Toolbar from "./Toolbar";

import styles from "./styles";

export default function ComposerBody(props: any) {
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

  const hasText = value.trim().length > 0;

  return (
    <View style={styles.composerContent}>
      <View style={styles.inputContainer}>
        <ComposerInput
          value={value}
          inputHeight={composer.state.inputHeight}
          scrollEnabled={composer.state.scrollEnabled}
          isExpanded={composer.state.isExpanded}
          onChangeText={onChangeText}
          onContentHeightChange={
            composer.actions.updateContentHeight
          }
          onFocus={composer.actions.focus}
          onBlur={composer.actions.blur}
        />
      </View>

      <Toolbar
        hasText={hasText}
        isLoading={isLoading}
        webSearchEnabled={webSearchEnabled}
        onSend={onSend}
        onAttachmentPress={onAttachmentPress}
        onToggleWebSearch={onToggleWebSearch}
      />
    </View>
  );
}