import React, { useMemo } from "react";
import { Text, View } from "react-native";
import MarkdownIt from "markdown-it";

import { useTheme } from "../../theme/useTheme";
import CodeBlock from "../CodeBlock";
import { createStyles } from "./styles";

interface AIResponseRendererProps {
  text: string;
}

const markdown = new MarkdownIt({
  typographer: true,
});

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
   *   line breaks
   */
  const renderInline = (
    children: any[],
    keyPrefix: string,
    blockStyle?: any
  ): React.ReactNode[] => {
    const result: React.ReactNode[] = [];

    let bold = false;
    let italic = false;
    let strike = false;

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
       * TEXT
       * ------------------------------------
       */
      if (token.type === "text") {
        result.push(
          <Text
            key={key}
            style={[
              blockStyle,
              bold && styles.strong,
              italic && styles.em,
              strike && styles.strike,
            ]}
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
       * LINKS
       * ------------------------------------
       *
       * We currently render the link text
       * normally.
       */
      if (
        token.type === "link_open" ||
        token.type === "link_close"
      ) {
        return;
      }

      /*
       * ------------------------------------
       * IMAGE
       * ------------------------------------
       *
       * Ignore image token here rather than
       * displaying broken content.
       */
      if (
        token.type === "image"
      ) {
        return;
      }
    });

    return result;
  };

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
 const renderResponse = () => {
  const output: React.ReactNode[] = [];

  /*
   * IMPORTANT
   *
   * All normal markdown content stays inside this
   * single selectable Text tree.
   *
   * This preserves selection across:
   *
   * paragraph
   * → heading
   * → list
   * → paragraph
   *
   * Code blocks remain separate because CodeBlock
   * needs its own View.
   */
  let proseParts: React.ReactNode[] = [];

  let inlineTokens: any[] = [];

  let headingLevel: number | null = null;

  let listType: "bullet" | "ordered" | null = null;

  let listItemIndex = 0;

  let insideListItem = false;

  /*
   * ================================================
   * ADD NORMAL PARAGRAPH
   * ================================================
   */
  const addParagraph = () => {
    if (!inlineTokens.length) {
      return;
    }

    /*
     * Render the paragraph itself.
     */
    proseParts.push(
      ...renderInline(
        inlineTokens,
        `paragraph-${proseParts.length}`
      )
    );

    /*
     * ONE VISUAL BLANK LINE AFTER EVERY NORMAL
     * PARAGRAPH.
     *
     * This is deliberately inside proseParts.
     *
     * Therefore it does NOT create a selectable
     * component boundary.
     */
    proseParts.push(
      <Text key={`paragraph-gap-${proseParts.length}`}>
        {"\n\n"}
      </Text>
    );

    inlineTokens = [];
  };

  /*
   * ================================================
   * FLUSH PROSE
   * ================================================
   */
  const flushProse = () => {
    if (proseParts.length === 0) {
      return;
    }

    output.push(
      <Text
        key={`prose-${output.length}`}
        selectable={true}
        style={styles.response}
      >
        {proseParts}
      </Text>
    );

    proseParts = [];
  };

  /*
   * ================================================
   * MARKDOWN TOKENS
   * ================================================
   */
  tokens.forEach((token: any, index: number) => {

    /*
     * ================================================
     * HEADING OPEN
     * ================================================
     */
    if (token.type === "heading_open") {
      headingLevel = Number(
        String(token.tag ?? "h1").replace("h", "")
      );

      inlineTokens = [];

      return;
    }

    /*
     * ================================================
     * HEADING CLOSE
     * ================================================
     */
    if (
      token.type === "heading_close" &&
      headingLevel !== null
    ) {
      if (inlineTokens.length > 0) {

        /*
         * The previous normal paragraph already added
         * its "\n\n".
         *
         * So we DON'T add another gap here.
         */
        proseParts.push(
          ...renderInline(
            inlineTokens,
            `heading-${index}`,
            getHeadingStyle(headingLevel)
          )
        );

        /*
         * Small separation after heading.
         */
        proseParts.push(
          <Text key={`heading-gap-${index}`}>
            {"\n"}
          </Text>
        );
      }

      inlineTokens = [];

      headingLevel = null;

      return;
    }

    /*
     * ================================================
     * BULLET LIST OPEN
     * ================================================
     */
    if (token.type === "bullet_list_open") {

      listType = "bullet";

      listItemIndex = 0;

      return;
    }

    /*
     * ================================================
     * ORDERED LIST OPEN
     * ================================================
     */
    if (token.type === "ordered_list_open") {

      listType = "ordered";

      const start =
        typeof token.attrGet === "function"
          ? Number(token.attrGet("start") ?? 1)
          : 1;

      listItemIndex = start - 1;

      return;
    }

    /*
     * ================================================
     * LIST ITEM OPEN
     * ================================================
     */
    if (token.type === "list_item_open") {

      listItemIndex += 1;

      insideListItem = true;

      inlineTokens = [];

      return;
    }

    /*
     * ================================================
     * INLINE CONTENT
     * ================================================
     */
    if (token.type === "inline") {

      inlineTokens =
        token.children ?? [];

      return;
    }

    /*
     * ================================================
     * PARAGRAPH OPEN
     * ================================================
     */
    if (token.type === "paragraph_open") {

      inlineTokens = [];

      return;
    }

    /*
     * ================================================
     * PARAGRAPH CLOSE
     * ================================================
     */
    if (token.type === "paragraph_close") {

      /*
       * List-item paragraphs are rendered when
       * list_item_close is reached.
       */
      if (insideListItem) {
        return;
      }

      addParagraph();

      return;
    }

    /*
     * ================================================
     * LIST ITEM CLOSE
     * ================================================
     */
    if (token.type === "list_item_close") {

      if (inlineTokens.length > 0) {

        const marker =
          listType === "ordered"
            ? `${listItemIndex}. `
            : "• ";

        proseParts.push(
          <Text
            key={`list-item-${index}`}
            style={styles.listItem}
          >
            <Text style={styles.listMarker}>
              {marker}
            </Text>

            {renderInline(
              inlineTokens,
              `list-${index}`,
              styles.listItem
            )}

            {"\n"}
          </Text>
        );
      }

      inlineTokens = [];

      insideListItem = false;

      return;
    }

    /*
     * ================================================
     * LIST CLOSE
     * ================================================
     */
    if (
      token.type === "bullet_list_close" ||
      token.type === "ordered_list_close"
    ) {

      listType = null;

      listItemIndex = 0;

      /*
       * Small separation after the list.
       */
      proseParts.push(
        <Text key={`list-gap-${index}`}>
          {"\n"}
        </Text>
      );

      return;
    }

    /*
     * ================================================
     * BLOCKQUOTE OPEN
     * ================================================
     */
    if (token.type === "blockquote_open") {

      inlineTokens = [];

      return;
    }

    /*
     * ================================================
     * BLOCKQUOTE CLOSE
     * ================================================
     */
    if (token.type === "blockquote_close") {

      if (inlineTokens.length > 0) {

        proseParts.push(
          <Text
            key={`blockquote-${index}`}
            style={styles.response}
          >
            {"┃ "}

            {renderInline(
              inlineTokens,
              `blockquote-${index}`
            )}

            {"\n\n"}
          </Text>
        );
      }

      inlineTokens = [];

      return;
    }

    /*
     * ================================================
     * FENCED CODE BLOCK
     * ================================================
     */
    if (token.type === "fence") {

      /*
       * Finish normal prose before code.
       */
      addParagraph();

      flushProse();

      const language =
        typeof token.info === "string" &&
        token.info.trim()
          ? token.info
              .trim()
              .split(/\s+/)[0]
          : "text";

      output.push(
        <View
          key={`code-${index}`}
          style={styles.codeContainer}
        >
          <CodeBlock
            code={String(
              token.content ?? ""
            )}
            language={language}
          />
        </View>
      );

      return;
    }

    /*
     * ================================================
     * INDENTED CODE BLOCK
     * ================================================
     */
    if (token.type === "code_block") {

      addParagraph();

      flushProse();

      output.push(
        <View
          key={`code-block-${index}`}
          style={styles.codeContainer}
        >
          <CodeBlock
            code={String(
              token.content ?? ""
            )}
            language="text"
          />
        </View>
      );

      return;
    }

    /*
     * ================================================
     * THEMATIC BREAK
     * ================================================
     */
    if (token.type === "hr") {

      proseParts.push(
        <Text
          key={`hr-${index}`}
          style={styles.response}
        >
          {"\n────────────\n"}
        </Text>
      );

      return;
    }
  });

  /*
   * ================================================
   * FINAL CONTENT
   * ================================================
   */
  if (
    inlineTokens.length > 0 &&
    !insideListItem
  ) {
    addParagraph();
  }

  /*
   * Remove one unnecessary trailing blank line
   * from the final paragraph.
   *
   * This keeps the bottom of the message clean.
   */
  if (proseParts.length > 0) {
    const last = proseParts[proseParts.length - 1];

    if (
      React.isValidElement(last) &&
      last.key?.toString().startsWith("paragraph-gap")
    ) {
      proseParts.pop();
    }
  }

  flushProse();

  return output;
};
 


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