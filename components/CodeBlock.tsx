import React, {
  useMemo,
  useState
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";

import {
  X,
  Copy,
  Check,
} from "lucide-react-native";

import * as Clipboard from "expo-clipboard";

import {
  useTheme
} from "../theme/useTheme";

import {
  tokenizeLine,
  getTokenStyle,
} from "../theme/codeSyntax";

import {
  
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface Props {
  code: string;
  language?: string;
}


export default function CodeBlock({
  code,
  language = "Code",
}: Props) {
  const {
    colors
  } = useTheme();

  const [isOpen,
    setIsOpen] = useState(false);
  const [copied,
    setCopied] = useState(false);

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  const cleanLanguage = String(language || "Code")
  .replace(/`/g, "")
  .trim()
  .toLowerCase();

  const insets = useSafeAreaInsets();

  const safeCode = String(code ?? "");

  const lines = safeCode.split("\n");

  const copyCode = async () => {
    await Clipboard.setStringAsync(safeCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };



  return (
    <>
      {/* ================================================= */}
      {/* INLINE CODE CARD */}
      {/* ================================================= */}

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.language}>
            {cleanLanguage || "Code"}
          </Text>

          <Pressable
            onPress={copyCode}
            hitSlop={8}
            style={({ pressed }) => [
              styles.inlineCopyButton,
              pressed && styles.inlineCopyPressed,
            ]}
            >
            {copied ? (
              <Check
                size={16}
                color={colors.primary}
                strokeWidth={2.5}
                />
            ): (
              <Text style={styles.copy}>
                Copy
              </Text>
            )}
          </Pressable>
        </View>

        {/* Preview is the tappable part */}
        <Pressable
          onPress={() => setIsOpen(true)}
          style={({ pressed }) => [
            styles.preview,
            pressed && styles.previewPressed,
          ]}
          >
          {lines.slice(0, 10).map((line, index) => (
            <View
              key={index}
              style={styles.codeLine}
              >
              <Text style={styles.lineNumber}>
                {index + 1}
              </Text>

              <Text
                style={styles.codeText}
                numberOfLines={1}
                >
                {tokenizeLine(line).map(
                  (token, tokenIndex) => (
                    <Text
                      key={tokenIndex}
                      style={getTokenStyle(
                        token.type,
                        colors
                      )}
                      >
                      {token.text}
                    </Text>
                  )
                )}
              </Text>
            </View>
          ))}

          {lines.length > 10 && (
            <View style={styles.moreOverlay}>
              <Text style={styles.moreText}>
                Tap to open full code
              </Text>
            </View>
          )}
        </Pressable>
      </View>


      {/* ================================================= */}
      {/* FULL SCREEN CODE VIEWER */}
      {/* ================================================= */}

      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="fullScreen"
statusBarTranslucent={true}
        
        transparent={false}
        onRequestClose={() => setIsOpen(false)}
        >

        <View
          style={[
            styles.modalContainer,
            {
              paddingTop: insets.top,
            },
          ]}
          >

          {/* ================= HEADER ================= */}

          <View style={styles.modalHeader}>

            {/* CLOSE */}
            <Pressable
              onPress={() => setIsOpen(false)}
              hitSlop={8}
              style={({ pressed }) => [
                styles.headerCircle,
                pressed && styles.pressed,
              ]}
              >
              <X
                size={28}
                color={colors.primary}
                strokeWidth={2.2}
                />
            </Pressable>


            {/* CODE / PREVIEW */}
            <View style={styles.segmentedControl}>

              <View style={styles.segmentActive}>
                <Text style={styles.segmentActiveText}>
                  Code
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.segment,
                  pressed && styles.segmentPressed,
                ]}
                >
                <Text style={styles.segmentText}>
                  Preview
                </Text>
              </Pressable>

            </View>


            {/* COPY */}
            <Pressable
              onPress={copyCode}
              hitSlop={8}
              style={({ pressed }) => [
                styles.headerCircle,
                pressed && styles.pressed,
              ]}
              >
              {copied ? (
                <Check
                  size={27}
                  color={colors.primary}
                  strokeWidth={2.5}
                  />
              ): (
                <Copy
                  size={27}
                  color={colors.primary}
                  strokeWidth={2}
                  />
              )}
            </Pressable>

          </View>


          {/* ================= CODE ================= */}

          <ScrollView
            style={styles.verticalCodeScroll}
            contentContainerStyle={styles.fullCodeContent}
            showsVerticalScrollIndicator
            nestedScrollEnabled
            >
            <View>
              {lines.map((line, index) => (
                <View
                  key={index}
                  style={styles.codeLine}
                  >
                  <Text style={styles.lineNumber}>
                    {index + 1}
                  </Text>

                  <Text style={styles.codeText}>
                    {tokenizeLine(line).map(
                      (token, tokenIndex) => (
                        <Text
                          key={tokenIndex}
                          style={getTokenStyle(
                            token.type,
                            colors
                          )}
                          >
                          {token.text}
                        </Text>
                      )
                    )}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

        </View>
      </Modal>
    </>
  );
}



  /* ================================================= */
  /* STYLES */
  /* ================================================= */

  const createStyles = (colors: any) =>
  StyleSheet.create({

    /* ========================================= */
    /* INLINE CARD */
    /* ========================================= */

    container: {
      backgroundColor:
      colors.codeBackground ??
      colors.background,

      borderRadius: 12,
      marginVertical: 8,

      overflow: "hidden",

      borderWidth: 1,
      borderColor:
      colors.codeBorder ??
      colors.border,
    },

    header: {
      height: 42,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      paddingHorizontal: 14,

      backgroundColor:
      colors.codeHeader ??
      colors.surface,

      borderBottomWidth: 1,
      borderBottomColor:
      colors.codeBorder ??
      colors.border,
    },

    language: {
      color:
      colors.codeLanguage ??
      colors.subText,

      fontSize: 13,
      fontWeight: "600",
    },

    inlineCopyButton: {
      minWidth: 40,
      minHeight: 32,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 8,
    },

    inlineCopyPressed: {
      opacity: 0.55,
      transform: [{
        scale: 0.96
      }],
    },

    copy: {
      color:
      colors.codeCopy ??
      colors.primary,

      fontSize: 13,
      fontWeight: "700",
    },

    /* ========================================= */
    /* PREVIEW */
    /* ========================================= */

    preview: {
      backgroundColor:
      colors.codeBackground ??
      colors.background,

      padding: 14,

      maxHeight: 250,

      overflow: "hidden",
    },

    previewPressed: {
      opacity: 0.88,
    },

    codeLine: {
      flexDirection: "row",
      alignItems: "flex-start",

      minHeight: 21,
      width: "100%",
    },

    lineNumber: {
      width: 36,

      marginRight: 12,

      color:
      colors.codeLineNumber ??
      colors.subText,

      fontFamily: "monospace",

      fontSize: 13,
      lineHeight: 21,

      textAlign: "right",

      opacity: 0.65,
    },

    codeText: {
      color:
      colors.codeText ??
      colors.text,

      fontFamily: "monospace",

      fontSize: 14,
      lineHeight: 21,

      includeFontPadding: false,

      flexShrink: 1,
    },

    moreOverlay: {
      position: "absolute",

      left: 0,
      right: 0,
      bottom: 0,

      height: 55,

      justifyContent: "flex-end",
      alignItems: "center",

      paddingBottom: 10,

      backgroundColor:
      colors.codeBackground ??
      colors.background,
    },

    moreText: {
      color:
      colors.codeCopy ??
      colors.primary,

      fontSize: 13,
      fontWeight: "600",
    },

    /* ========================================= */
    /* FULLSCREEN MODAL */
    /* ========================================= */

    modalContainer: {
      flex: 1,

      backgroundColor:
      colors.codeBackground ??
      colors.background,
    },

    /* ========================================= */
    /* MODAL HEADER */
    /* ========================================= */

    modalHeader: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor:
      colors.codeHeader ??
      colors.surface,
      borderBottomWidth: 1,
      borderBottomColor:
      colors.codeBorder ??
      colors.border,

    },

    headerCircle: {
      width: 40,
      height: 40,

      borderRadius: 23,

      alignItems: "center",
      justifyContent: "center",

      backgroundColor:
      colors.codeButton ??
      colors.surface,

      borderWidth: 1,
      borderColor:
      colors.codeBorder ??
      colors.border,
    },

    pressed: {
      opacity: 0.65,

      transform: [{
        scale: 0.94
      },
      ],
    },

    /* ========================================= */
    /* SEGMENTED CONTROL */
    /* ========================================= */

    segmentedControl: {
      flex: 1,

      height: 46,

      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 14,
      padding: 4,
      borderRadius: 23,
      backgroundColor:
      colors.codeSegmentBackground ??
      colors.surface,
    },

    segmentActive: {
      flex: 1,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",

      backgroundColor:
      colors.codeSegmentActive ??
      colors.codeBackground,
    },

    segmentActiveText: {
      color:
      colors.codeSegmentActiveText ??
      colors.text,

      fontSize: 14,
      fontWeight: "700",
    },

    segment: {
      flex: 1,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
    },

    segmentPressed: {
      backgroundColor:
      colors.codeSegmentPressed ??
      colors.codeBackground,
    },

    segmentText: {
      color:
      colors.codeSegmentText ??
      colors.subText,
      fontSize: 14,
      fontWeight: "600",
    },

    /* ========================================= */
    /* FULLSCREEN CODE SCROLL */
    /* ========================================= */

    verticalCodeScroll: {
      flex: 1,
      backgroundColor:
      colors.codeBackground ??
      colors.background,
    },

    fullCodeContent: {
      paddingTop: 22,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 60,
    },
  });