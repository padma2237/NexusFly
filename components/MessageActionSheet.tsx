import React, {
  forwardRef,
  useMemo,
} from "react";

import {
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import { useTheme } from "../theme/useTheme";

interface Props {
  onCopy: () => void;
  onShare: () => void;
  onRegenerate?: () => void;

  // NEW
  onEdit?: () => void;
  onSelect?: () => void;
  onEnhance?: () => void;

  onChange?: (index: number) => void;
}

const MessageActionSheet = forwardRef<
  BottomSheetModal,
  Props
>(
  (
    {
      onCopy,
      onShare,
      onRegenerate,
      onEdit,
      onSelect,
      onEnhance,
      onChange,
    },
    ref
  ) => {
    const { colors } = useTheme();

    const snapPoints = useMemo(
      () => ["55%"],
      []
    );

    const styles = useMemo(
      () => createStyles(colors),
      [colors]
    );

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    );

    const dismiss = () => {
      (
        ref as React.RefObject<BottomSheetModal>
      ).current?.dismiss();
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        onChange={onChange}
        backdropComponent={renderBackdrop}
        enableDismissOnClose={true}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: colors.surface,
        }}
      >
        <BottomSheetView style={styles.container}>

          {onEdit && (
            <Pressable
              style={styles.item}
              onPress={() => {
                dismiss();
                onEdit();
              }}
            >
              <Text style={styles.text}>
                ✏️ Edit
              </Text>
            </Pressable>
          )}

          <Pressable
            style={styles.item}
            onPress={() => {
              dismiss();
              onCopy();
            }}
          >
            <Text style={styles.text}>
              📋 Copy
            </Text>
          </Pressable>
          
          <Pressable
            style={styles.item}
            onPress={() => {
              dismiss();
              onShare();
            }}
          >
            <Text style={styles.text}>
              📤 Share
            </Text>
          </Pressable>

          {onSelect && (
            <Pressable
              style={styles.item}
              onPress={() => {
                dismiss();
                onSelect();
              }}
            >
              <Text style={styles.text}>
                ☑️ Select
              </Text>
            </Pressable>
          )}

          {onEnhance && (
            <Pressable
              style={styles.item}
              onPress={() => {
                dismiss();
                onEnhance();
              }}
            >
              <Text style={styles.text}>
                ✨ Enhance Prompt
              </Text>
            </Pressable>
          )}

          {onRegenerate && (
            <Pressable
              style={styles.item}
              onPress={() => {
                dismiss();
                onRegenerate();
              }}
            >
              <Text style={styles.text}>
                🔄 Regenerate
              </Text>
            </Pressable>
          )}

        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default MessageActionSheet;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      padding: 20,
    },

    item: {
      paddingVertical: 16,
    },

    text: {
      fontSize: 18,
      color: colors.text,
    },
  });