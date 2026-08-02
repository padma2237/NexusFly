import React from "react";
import { View } from "react-native";

import ComposerInput from "./components/ComposerInput";
import Toolbar from "./Toolbar";

import styles from "./styles";

import LeftActions from "./components/LeftActions";
import RightActions from "./components/RightActions";

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
  const expanded = composer.state.isExpanded;
  
  const handleSend = () => {
  if (!hasText) return;

  onSend();

  composer.actions.reset();
};
 
 return (
  <View
    style={[
      styles.composerContent,
      expanded
        ? styles.expandedLayout
        : styles.collapsedLayout,
    ]}
  >
    {!expanded && (
      <LeftActions
        webSearchEnabled={webSearchEnabled}
        onAttachmentPress={onAttachmentPress}
        onToggleWebSearch={onToggleWebSearch}
      />
    )}

    <View
      style={[
        styles.inputContainer,
        expanded
          ? styles.inputContainerExpanded
          : styles.inputContainerCollapsed,
      ]}
    >
      <ComposerInput
        value={value}
        inputHeight={composer.state.inputHeight}
        scrollEnabled={composer.state.scrollEnabled}
        isExpanded={expanded}
        onChangeText={onChangeText}
        onContentHeightChange={composer.actions.updateContentHeight}
        onFocus={composer.actions.focus}
        onBlur={composer.actions.blur}
      />
    </View>

    {expanded ? (
      <Toolbar
        animatedStyle={composer.animation.toolbarStyle}
        hasText={hasText}
        isLoading={isLoading}
        webSearchEnabled={webSearchEnabled}
        onSend={handleSend}
        onAttachmentPress={onAttachmentPress}
        onToggleWebSearch={onToggleWebSearch}
      />
    ) : (
      <RightActions
        hasText={hasText}
        isLoading={isLoading}
        onSend={handleSend}
      />
    )}
  </View>
);

}