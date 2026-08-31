import React from "react";
import { Text, View } from "react-native";

import CodeBlock from "../../CodeBlock";
import { renderInline } from "./renderInline";
import { renderTable } from "./renderTable";

interface RenderBlocksOptions {
  tokens: any[];
  styles: any;
  getHeadingStyle: (level: number) => any;
}

export const renderBlocks = ({
  tokens,
  styles,
  getHeadingStyle,
}: RenderBlocksOptions): React.ReactNode[] => {
  const output: React.ReactNode[] = [];

  /*
   * All normal Markdown content remains inside
   * selectable Text trees.
   *
   * Code blocks remain separate because CodeBlock
   * requires its own View.
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

    proseParts.push(
      ...renderInline(
        inlineTokens,
        `paragraph-${proseParts.length}`,
        styles
      )
    );

    /*
     * Keep the visual paragraph gap inside the
     * same selectable Text tree.
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
   * PROCESS MARKDOWN TOKENS
   * ================================================
   */
  
    
    for (
  let index = 0;
  index < tokens.length;
  index++
) {
  const token = tokens[index];
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

      continue;
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
        proseParts.push(
          ...renderInline(
            inlineTokens,
            `heading-${index}`,
            styles,
            getHeadingStyle(headingLevel)
          )
        );

        proseParts.push(
          <Text key={`heading-gap-${index}`}>
            {"\n"}
          </Text>
        );
      }

      inlineTokens = [];
      headingLevel = null;
      
continue;

    }

    /*
     * ================================================
     * BULLET LIST OPEN
     * ================================================
     */
    if (token.type === "bullet_list_open") {
      listType = "bullet";
      listItemIndex = 0;

      
      continue;
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

continue;
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

continue;
    }

    /*
     * ================================================
     * INLINE CONTENT
     * ================================================
     */
    if (token.type === "inline") {
      inlineTokens = token.children ?? [];

continue;
    }

    /*
     * ================================================
     * PARAGRAPH OPEN
     * ================================================
     */
    if (token.type === "paragraph_open") {
      inlineTokens = [];

continue;
    }

    /*
     * ================================================
     * PARAGRAPH CLOSE
     * ================================================
     */
    if (token.type === "paragraph_close") {
      /*
       * List-item paragraphs are rendered at
       * list_item_close.
       */
      if (insideListItem) {
continue;
      }

      addParagraph();

continue;
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
              styles,
              styles.listItem
            )}

            {"\n"}
          </Text>
        );
      }

      inlineTokens = [];
      insideListItem = false;

continue;
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

      proseParts.push(
        <Text key={`list-gap-${index}`}>
          {"\n"}
        </Text>
      );

continue;
    }

    /*
     * ================================================
     * BLOCKQUOTE OPEN
     * ================================================
     */
    if (token.type === "blockquote_open") {
      inlineTokens = [];

continue;
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
              `blockquote-${index}`,
              styles
            )}

            {"\n\n"}
          </Text>
        );
      }

      inlineTokens = [];

continue;
    }



    /*
     * ================================================
     * TABLE
     * ================================================
     */
    if (token.type === "table_open") {
      /*
       * Finish normal text before the table.
       */
      flushProse();

      const result = renderTable({
        tokens,
        startIndex: index + 1,
        styles,
      });

      output.push(
        <React.Fragment key={`table-${index}`}>
          {result.node}
        </React.Fragment>
      );

      /*
       * Jump directly to table_close.
       */
      index = result.nextIndex;

      continue;
    }




    /*
     * ================================================
     * FENCED CODE BLOCK
     * ================================================
     */
    if (token.type === "fence") {
      addParagraph();
      flushProse();

      const language =
        typeof token.info === "string" &&
        token.info.trim()
          ? token.info.trim().split(/\s+/)[0]
          : "text";

      output.push(
        <View
          key={`code-${index}`}
          style={styles.codeContainer}
        >
          <CodeBlock
            code={String(token.content ?? "")}
            language={language}
          />
        </View>
      );

continue;
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
            code={String(token.content ?? "")}
            language="text"
          />
        </View>
      );

      
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

continue;
    }
    
}
  // });

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
   * Remove the final paragraph's visual gap.
   */
  if (proseParts.length > 0) {
    const last =
      proseParts[proseParts.length - 1];

    if (
      React.isValidElement(last) &&
      last.key
        ?.toString()
        .startsWith("paragraph-gap")
    ) {
      proseParts.pop();
    }
  }

  flushProse();

  return output;
};