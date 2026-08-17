import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Modal,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import { useTheme } from "../theme/useTheme";

interface Props {
  code: string;
  language?: string;
}

interface Token {
  text: string;
  type: string;
}

export default function CodeBlock({
  code,
  language = "Code",
}: Props) {
  const { colors } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  const cleanLanguage = String(language || "Code")
    .replace(/`/g, "")
    .trim()
    .toLowerCase();

  const safeCode = String(code ?? "");

  const lines = safeCode.split("\n");

  const copyCode = async () => {
    await Clipboard.setStringAsync(safeCode);

    Alert.alert(
      "Copied",
      "Code copied to clipboard."
    );
  };

  return (
    <>
      {/* ================================================= */}
      {/* INLINE CODE PREVIEW */}
      {/* ================================================= */}

      <Pressable
        onPress={() => setIsOpen(true)}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.language}>
            {cleanLanguage || "Code"}
          </Text>

          <Pressable
            onPress={copyCode}
            hitSlop={8}
          >
            <Text style={styles.copy}>
              Copy
            </Text>
          </Pressable>
        </View>

        {/* Preview */}
        <View style={styles.preview}>
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

          {/* More indicator */}
          {lines.length > 10 && (
            <View style={styles.moreOverlay}>
              <Text style={styles.moreText}>
                Tap to open full code
              </Text>
            </View>
          )}
        </View>
      </Pressable>

      {/* ================================================= */}
      {/* FULL SCREEN CODE VIEWER */}
      {/* ================================================= */}

      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalContainer}>

          {/* Modal Header */}
          <View style={styles.modalHeader}>

            <Pressable
              onPress={() => setIsOpen(false)}
              hitSlop={10}
              style={styles.backButton}
            >
              <Text style={styles.backText}>
                ‹
              </Text>
            </Pressable>

            <Text
              style={styles.modalLanguage}
              numberOfLines={1}
            >
              {cleanLanguage || "Code"}
            </Text>

            <Pressable
              onPress={copyCode}
              hitSlop={10}
              style={styles.modalCopyButton}
            >
              <Text style={styles.copy}>
                Copy
              </Text>
            </Pressable>

          </View>

          {/* Full code scrolling */}
          <ScrollView
            style={styles.verticalCodeScroll}
            contentContainerStyle={
              styles.fullCodeContent
            }
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              nestedScrollEnabled
              contentContainerStyle={
                styles.horizontalCodeContent
              }
            >
              <View>
                {lines.map((line, index) => (
                  <View
                    key={index}
                    style={styles.codeLine}
                  >
                    <Text
                      style={styles.lineNumber}
                    >
                      {index + 1}
                    </Text>

                    <Text
                      style={styles.codeText}
                    >
                      {tokenizeLine(line).map(
                        (
                          token,
                          tokenIndex
                        ) => (
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
          </ScrollView>

        </View>
      </Modal>
    </>
  );
}

/* ================================================= */
/* TOKENIZER */
/* ================================================= */

function tokenizeLine(
  line: string
): Token[] {
  const tokens: Token[] = [];

  const regex =
    /(\/\/.*|#.*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|if|else|for|while|import|from|export|default|class|extends|new|this|true|false|null|undefined|async|await|interface|type|public|private|def|in|and|or|not|None|True|False)\b|\b\d+(?:\.\d+)?\b)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while (
    (match = regex.exec(line)) !== null
  ) {
    if (match.index > lastIndex) {
      tokens.push({
        text: line.slice(
          lastIndex,
          match.index
        ),
        type: "plain",
      });
    }

    const value = match[0];

    let type = "plain";

    if (
      value.startsWith("//") ||
      value.startsWith("#")
    ) {
      type = "comment";
    } else if (
      value.startsWith("'") ||
      value.startsWith('"') ||
      value.startsWith("`")
    ) {
      type = "string";
    } else if (/^\d/.test(value)) {
      type = "number";
    } else {
      type = "keyword";
    }

    tokens.push({
      text: value,
      type,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push({
      text: line.slice(lastIndex),
      type: "plain",
    });
  }

  if (tokens.length === 0) {
    tokens.push({
      text: line || " ",
      type: "plain",
    });
  }

  return tokens;
}

/* ================================================= */
/* THEME-AWARE TOKEN COLORS */
/* ================================================= */

function getTokenStyle(
  type: string,
  colors: any
) {
  const tokenColors: Record<
    string,
    string
  > = {
    plain:
      colors.codeText ??
      colors.text,

    keyword:
      colors.codeKeyword ??
      colors.primary,

    string:
      colors.codeString ??
      colors.text,

    number:
      colors.codeNumber ??
      colors.primary,

    comment:
      colors.codeComment ??
      colors.subText,

    punctuation:
      colors.codePunctuation ??
      colors.subText,
  };

  return {
    color:
      tokenColors[type] ??
      tokenColors.plain,
  };
}

/* ================================================= */
/* STYLES */
/* ================================================= */

const createStyles = (colors: any) =>
  StyleSheet.create({

    /* ----------------------------- */
    /* INLINE CODE CARD */
    /* ----------------------------- */

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
      flexDirection: "row",

      justifyContent:
        "space-between",

      alignItems: "center",

      backgroundColor:
        colors.codeHeader ??
        colors.surface,

      paddingHorizontal: 14,

      paddingVertical: 9,

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

    copy: {
      color:
        colors.codeCopy ??
        colors.primary,

      fontSize: 13,

      fontWeight: "700",
    },

    preview: {
      backgroundColor:
        colors.codeBackground ??
        colors.background,

      padding: 14,

      maxHeight: 250,

      overflow: "hidden",
    },

    codeLine: {
      flexDirection: "row",

      alignItems: "flex-start",

      minHeight: 21,
    },

    lineNumber: {
      width: 32,

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

    /* ----------------------------- */
    /* FULL SCREEN */
    /* ----------------------------- */

    modalContainer: {
      flex: 1,

      backgroundColor:
        colors.codeBackground ??
        colors.background,
    },

    modalHeader: {
      flexDirection: "row",

      alignItems: "center",

      height: 60,

      paddingHorizontal: 14,

      backgroundColor:
        colors.codeHeader ??
        colors.surface,

      borderBottomWidth: 1,

      borderBottomColor:
        colors.codeBorder ??
        colors.border,
    },

    backButton: {
      width: 42,

      height: 42,

      alignItems: "center",

      justifyContent: "center",
    },

    backText: {
      color: colors.text,

      fontSize: 36,

      fontWeight: "300",

      lineHeight: 38,
    },

    modalLanguage: {
      flex: 1,

      color: colors.text,

      fontSize: 16,

      fontWeight: "700",

      marginHorizontal: 8,
    },

    modalCopyButton: {
      paddingHorizontal: 8,
    },

    verticalCodeScroll: {
      flex: 1,

      backgroundColor:
        colors.codeBackground ??
        colors.background,
    },

    fullCodeContent: {
      padding: 16,

      paddingBottom: 40,
    },

    horizontalCodeContent: {
      paddingRight: 40,
    },

  });