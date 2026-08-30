import React from "react";
import {
  Linking,
  Text,
  StyleProp,
  TextStyle,
} from "react-native";

interface RenderInlineStyles {
  strong: TextStyle;
  em: TextStyle;
  strike: TextStyle;
  inlineCode: TextStyle;
  link: TextStyle;
}

export const renderInline = (
  children: any[],
  keyPrefix: string,
  styles: RenderInlineStyles,
  blockStyle?: StyleProp<TextStyle>
): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  let bold = false;
  let italic = false;
  let strike = false;

  let linkHref: string | null = null;

  children.forEach((token, index) => {
    const key = `${keyPrefix}-${index}`;

    /*
     * ------------------------------------
     * BOLD
     * ------------------------------------
     */
    if (token.type === "strong_open") {
      bold = true;
      return;
    }

    if (token.type === "strong_close") {
      bold = false;
      return;
    }

    /*
     * ------------------------------------
     * ITALIC
     * ------------------------------------
     */
    if (token.type === "em_open") {
      italic = true;
      return;
    }

    if (token.type === "em_close") {
      italic = false;
      return;
    }

    /*
     * ------------------------------------
     * STRIKETHROUGH
     * ------------------------------------
     */
    if (token.type === "s_open") {
      strike = true;
      return;
    }

    if (token.type === "s_close") {
      strike = false;
      return;
    }

    /*
     * ------------------------------------
     * LINK OPEN
     * ------------------------------------
     */
    if (token.type === "link_open") {
      linkHref =
        typeof token.attrGet === "function"
          ? token.attrGet("href")
          : null;

      return;
    }

    /*
     * ------------------------------------
     * LINK CLOSE
     * ------------------------------------
     */
    if (token.type === "link_close") {
      linkHref = null;
      return;
    }

    /*
     * ------------------------------------
     * TEXT
     * ------------------------------------
     */
    if (token.type === "text") {
      const textStyle: StyleProp<TextStyle> = [
        blockStyle,
        bold && styles.strong,
        italic && styles.em,
        strike && styles.strike,
        linkHref && styles.link,
      ];

      /*
       * Normal text
       */
      if (!linkHref) {
        result.push(
          <Text
            key={key}
            style={textStyle}
          >
            {token.content}
          </Text>
        );

        return;
      }

      /*
       * Clickable link
       *
       * Nested Text is intentional.
       * It keeps the link inside the same
       * selectable Text hierarchy.
       */
      const href = linkHref;

      result.push(
        <Text
          key={key}
          style={textStyle}
          onPress={() => {
            Linking.openURL(href).catch(() => {});
          }}
        >
          {token.content}
        </Text>
      );

      return;
    }

    /*
     * ------------------------------------
     * INLINE CODE
     * ------------------------------------
     */
    if (token.type === "code_inline") {
      result.push(
        <Text
          key={key}
          style={[
            blockStyle,
            styles.inlineCode,
            bold && styles.strong,
            italic && styles.em,
          ]}
        >
          {token.content}
        </Text>
      );

      return;
    }

    /*
     * ------------------------------------
     * SOFT / HARD BREAK
     * ------------------------------------
     */
    if (
      token.type === "softbreak" ||
      token.type === "hardbreak"
    ) {
      result.push(
        <Text key={key}>
          {"\n"}
        </Text>
      );

      return;
    }

    /*
     * ------------------------------------
     * IMAGE
     * ------------------------------------
     *
     * Images will be handled separately.
     */
    if (token.type === "image") {
      return;
    }
  });

  return result;
};