import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

import AttachmentSheet from "../AttachmentSheet";

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
  onLayout,
  onToggleWebSearch,
}: ComposerProps) {

  const composer = useComposer();

  const attachmentSheetRef = useRef<BottomSheetModal>(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );

    const hide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardHeight(0)
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <>
      <ComposerCard
        animatedStyle={[
          composer.animation.containerStyle,
          { bottom: keyboardHeight + 6 },
        ]}
        onLayout={onLayout}
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
        onCamera={() => attachmentSheetRef.current?.dismiss()}
        onGallery={() => attachmentSheetRef.current?.dismiss()}
        onFile={() => attachmentSheetRef.current?.dismiss()}
        onClipboard={() => attachmentSheetRef.current?.dismiss()}
      />
    </>
  );
}