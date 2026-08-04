import React, { useRef } from "react";
import { Keyboard } from "react-native";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

import AttachmentSheet from "../AttachmentSheet";

import ComposerCard from "./ComposerCard";
import ComposerBody from "./ComposerBody";

import useComposer from "./hooks/useComposer";

import {
  ComposerProps,
} from "./types";

export default function Composer({
  value,
  isLoading,
  webSearchEnabled,
  onChangeText,
  onSend,
  
  onToggleWebSearch,
}: ComposerProps) {
  
  const composer = useComposer();
  const attachmentSheetRef =
  useRef<BottomSheetModal>(null);

 return (
  <>
    <ComposerCard
      animatedStyle={composer.animation.containerStyle}
    >
      <ComposerBody
        composer={composer}
        value={value}
        isLoading={isLoading}
        webSearchEnabled={webSearchEnabled}
        onChangeText={onChangeText}
        onSend={onSend}
        
        
        onAttachmentPress={() => {
  Keyboard.dismiss();

  requestAnimationFrame(() => {
    attachmentSheetRef.current?.present();
  });
}}
        onToggleWebSearch={onToggleWebSearch}
      />
    </ComposerCard>

    <AttachmentSheet
      ref={attachmentSheetRef}
      onCamera={() => {
        attachmentSheetRef.current?.dismiss();
      }}
      onGallery={() => {
        attachmentSheetRef.current?.dismiss();
      }}
      onFile={() => {
        attachmentSheetRef.current?.dismiss();
      }}
      onClipboard={() => {
        attachmentSheetRef.current?.dismiss();
      }}
    />
  </>
);
}