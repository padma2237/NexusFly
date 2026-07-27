import React from "react";


export interface ComposerInputProps {
  value: string;

  inputHeight: number;

  scrollEnabled: boolean;
  
  isExpanded: boolean;

  onChangeText: (text: string) => void;

  onContentHeightChange: (height: number) => void;

  onFocus: () => void;

  onBlur: () => void;
}

export interface ToolbarProps {
  hasText: boolean;

  webSearchEnabled: boolean;

  isLoading: boolean;

  onSend: () => void;

  onAttachmentPress: () => void;

  onToggleWebSearch: () => void;
}

export interface LeftActionsProps {
  webSearchEnabled: boolean;

  onAttachmentPress: () => void;

  onToggleWebSearch: () => void;
}

export interface RightActionsProps {
  hasText: boolean;

  isLoading: boolean;

  onSend: () => void;
}

export interface ActionButtonProps {
  icon: React.ReactNode;

  onPress: () => void;

  disabled?: boolean;
}

export interface AttachmentButtonProps {
  onPress: () => void;
}

export interface SearchButtonProps {
  enabled: boolean;

  onPress: () => void;
}

export interface SendButtonProps {
  hasText: boolean;

  isLoading: boolean;

  onSend: () => void;
}

export interface ComposerProps {
  value: string;

  isLoading: boolean;

  webSearchEnabled: boolean;

  onChangeText: (text: string) => void;

  onSend: () => void;

  onAttachmentPress: () => void;

  onToggleWebSearch: () => void;
}