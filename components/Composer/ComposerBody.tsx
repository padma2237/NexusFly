import React from "react";
import { View } from "react-native";

import ComposerInput from "./components/ComposerInput";
import Toolbar from "./Toolbar";

import styles from "./styles";


import AttachmentPreview from "../Attachments/components/AttachmentPreview";


import LeftActions from "./components/LeftActions";
import RightActions from "./components/RightActions";

export default function ComposerBody(props: any) {
  
  
  const {
  composer,
  value,
  isLoading,
  inputRef,
  webSearchEnabled,
  onChangeText,
  onSend,
  onStop,
  onAttachmentPress,
  onToggleWebSearch,
  attachments,
  onRemoveAttachment,
} = props;

const hasText = value.trim().length > 0;
const hasAttachments = attachments.length > 0;
const canSend = hasText || hasAttachments;

// const inputRef = React.useRef<TextInput>(null);

const expanded = composer.state.isExpanded;

const handleSend = () => {
  if (!canSend) return;

  onSend(attachments);

  composer.actions.reset();
};
 
 return (
   <View>
    <AttachmentPreview
      attachments={attachments}
      onRemove={onRemoveAttachment}
    />
    
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
      ref={inputRef}
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
        hasText={canSend}
        isLoading={isLoading}
        webSearchEnabled={webSearchEnabled}
        onSend={handleSend}
        onStop={onStop}
        onAttachmentPress={onAttachmentPress}
        onToggleWebSearch={onToggleWebSearch}
      />
    ) : (
      <RightActions
        hasText={canSend}
        isLoading={isLoading}
        onSend={handleSend}
onStop={onStop}
      />
    )}
  </View>
  </View>
  
);

}