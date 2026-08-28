import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Keyboard,
  Platform,
} from "react-native";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

// import AttachmentSheet from "../AttachmentSheet";

import AttachmentSheet from "../Attachments/components/AttachmentSheet";

import useAttachments from "../Attachments/hooks/useAttachments";

import ComposerCard from "./ComposerCard";
import ComposerBody from "./ComposerBody";

import useComposer from "./hooks/useComposer";

import { ComposerProps } from "./types";

export default function Composer({
  value,
  isLoading,
  webSearchEnabled,
  onChangeText,
  onSend,
  onStop,
  onLayout,
  onToggleWebSearch,
  currentConversationId
  
}: ComposerProps) {

  const composer = useComposer();
  
  const attachments = useAttachments();
  
  useEffect(() => {
  attachments.clearAttachments();
}, [currentConversationId]);

  const attachmentSheetRef =
    useRef<BottomSheetModal>(null);

  const [keyboardHeight, setKeyboardHeight] =
    useState(0);

  useEffect(() => {

    const showEvent =
      Platform.OS === "ios"
        ? "keyboardWillShow"
        : "keyboardDidShow";

    const hideEvent =
      Platform.OS === "ios"
        ? "keyboardWillHide"
        : "keyboardDidHide";

    const showSubscription =
      Keyboard.addListener(
        showEvent,
        (event) => {
          setKeyboardHeight(
            event.endCoordinates.height
          );
        }
      );

    const hideSubscription =
      Keyboard.addListener(
        hideEvent,
        () => {
          setKeyboardHeight(0);
        }
      );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };

  }, []);

  return (
    <>
      <ComposerCard
        animatedStyle={[
          composer.animation.containerStyle,

          {
            bottom: keyboardHeight + 6,
          },
        ]}
        onLayout={onLayout}
      >

        <ComposerBody
          composer={composer}
          value={value}
          isLoading={isLoading}
          webSearchEnabled={webSearchEnabled}
          onChangeText={onChangeText}
          
          



onSend={() => {
  const currentAttachments = attachments.attachments;

  attachments.clearAttachments();

  onSend(currentAttachments);
}}

onStop={onStop}

          onAttachmentPress={() => {
            Keyboard.dismiss();

            requestAnimationFrame(() => {
              attachmentSheetRef.current?.present();
            });
          }}

          onToggleWebSearch={onToggleWebSearch}
            attachments={attachments.attachments}
  onRemoveAttachment={
    attachments.removeAttachment
  }
        />

      </ComposerCard>

      <AttachmentSheet
        ref={attachmentSheetRef}
        
        onCamera={async () => {
  attachmentSheetRef.current?.dismiss();

  await attachments.capturePhoto();
}}
        
        
        
        onGallery={async () => {
  attachmentSheetRef.current?.dismiss();

  await attachments.selectPhoto();
}}
    
    onFile={async () => {
  attachmentSheetRef.current?.dismiss();

  await attachments.selectFile();
}}
    
    
        
        onClipboard={() =>
          attachmentSheetRef.current?.dismiss()
        }
      />
    </>
  );
}