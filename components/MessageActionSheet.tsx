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

import Colors from "../constants/colors";

interface Props {
  onCopy: () => void;
  onShare: () => void;
  onRegenerate?: () => void;
  onChange?: (index: number) => void;
}

const MessageActionSheet = forwardRef<BottomSheetModal, Props>(
  ({ onCopy, onShare, onRegenerate, onChange }, ref) => {
    const snapPoints = useMemo(() => ["35%"], []);
    const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    pressBehavior="close"
  />
);

    const dismiss = () => {
      (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
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
          backgroundColor: Colors.surface,
        }}
      >
        <BottomSheetView style={styles.container}>

          <Pressable
            style={styles.item}
            onPress={() => {
              dismiss();
              onCopy();
            }}
          >
            <Text style={styles.text}>📋 Copy</Text>
          </Pressable>

          <Pressable
            style={styles.item}
            onPress={() => {
              dismiss();
              onShare();
            }}
          >
            <Text style={styles.text}>📤 Share</Text>
          </Pressable>

          {onRegenerate && (
            <Pressable
              style={styles.item}
              onPress={() => {
                dismiss();
                onRegenerate();
              }}
            >
              <Text style={styles.text}>🔄 Regenerate</Text>
            </Pressable>
          )}

        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default MessageActionSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  item: {
    paddingVertical: 18,
  },

  text: {
    fontSize: 18,
    color: Colors.text,
  },
});