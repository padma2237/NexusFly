import React, { useMemo } from "react";
import { Text, View } from "react-native";
import MarkdownIt from "markdown-it";

import { useTheme } from "../../theme/useTheme";
import CodeBlock from "../CodeBlock";
import { createStyles } from "./styles";

import { renderInline } from "./markdown/renderInline";
import { renderBlocks } from "./markdown/renderBlocks";

interface AIResponseRendererProps {
  text: string;
}




const markdown = new MarkdownIt({
  typographer: true,
}).enable(["table"]);

export default function AIResponseRenderer({
  text,
}: AIResponseRendererProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  const tokens = useMemo(
    () => markdown.parse(text, {}),
    [text]
  );

  /*
   * ========================================
   * INLINE MARKDOWN
   * ========================================
   *
   * Handles:
   *   **bold**
   *   *italic*
   *   ~~strikethrough~~
   *   `inline code`
   *   links
   *   line breaks
   *
   * IMPORTANT:
   *
   * Everything remains inside the same
   * selectable Text tree.
   *
   * Links use nested Text rather than
   * Pressable/View so text selection remains
   * compatible with the surrounding response.
   */
  

  /*
   * ========================================
   * HEADING STYLE
   * ========================================
   */
  const getHeadingStyle = (level: number) => {
    switch (level) {
      case 1:
        return styles.heading1;

      case 2:
        return styles.heading2;

      case 3:
        return styles.heading3;

      case 4:
        return styles.heading4;

      case 5:
        return styles.heading5;

      default:
        return styles.heading6;
    }
  };

  /*
   * ========================================
   * RESPONSE RENDERING
   * ========================================
   */


const renderResponse = () =>
  renderBlocks({
    tokens,
    styles,
    getHeadingStyle,
  });
 


  /*
   * ========================================
   * FINAL COMPONENT
   * ========================================
   */
  return (
    <View style={styles.container}>
      {renderResponse()}
    </View>
  );
}