import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  LayoutChangeEvent,
  Pressable,
} from "react-native";

import { renderInline } from "./renderInline";

import * as Clipboard from "expo-clipboard";

interface RenderTableOptions {
  tokens: any[];
  startIndex: number;
  styles: any;
}

interface TableRow {
  cells: {
    tokens: any[];
    isHeader: boolean;
  }[];
}

interface RenderTableResult {
  node: React.ReactNode;
  nextIndex: number;
}

export const renderTable = ({
  tokens,
  startIndex,
  styles,
}: RenderTableOptions): RenderTableResult => {
  const rows: TableRow[] = [];

  let currentRow: TableRow | null = null;

  let currentCell: {
    tokens: any[];
    isHeader: boolean;
  } | null = null;

  for (
    let i = startIndex;
    i < tokens.length;
    i++
  ) {
    const token = tokens[i];

    if (token.type === "table_close") {
      break;
    }

    if (token.type === "tr_open") {
      currentRow = {
        cells: [],
      };

      rows.push(currentRow);
      currentCell = null;

      continue;
    }

    if (token.type === "tr_close") {
      currentCell = null;
      continue;
    }

    if (token.type === "th_open") {
      if (!currentRow) continue;

      currentCell = {
        tokens: [],
        isHeader: true,
      };

      currentRow.cells.push(currentCell);

      continue;
    }

    if (token.type === "td_open") {
      if (!currentRow) continue;

      currentCell = {
        tokens: [],
        isHeader: false,
      };

      currentRow.cells.push(currentCell);

      continue;
    }

    if (
      token.type === "th_close" ||
      token.type === "td_close"
    ) {
      currentCell = null;
      continue;
    }

    if (
      token.type === "inline" &&
      currentCell
    ) {
      currentCell.tokens =
        token.children ?? [];

      continue;
    }
  }

  const columnCount = rows.reduce(
    (maximum, row) =>
      Math.max(maximum, row.cells.length),
    0
  );
  
  
  const getCellText = (cell: TableRow["cells"][number]) => {
  return cell.tokens
    .map((token: any) => token.content ?? "")
    .join("");
};

const tableText = rows
  .map((row) =>
    row.cells
      .map((cell) => getCellText(cell))
      .join("\t")
  )
  .join("\n");

  /*
   * ============================================
   * TABLE WIDTH
   * ============================================
   *
   * 1–4 columns:
   * Fit inside the available bubble width.
   *
   * 5+ columns:
   * Use horizontal scrolling.
   */

  const shouldScroll =
    columnCount >= 5;

  /*
   * ============================================
   * TABLE COMPONENT
   * ============================================
   */

  const TableContent = ({
    availableWidth,
  }: {
    availableWidth: number;
  }) => {
    /*
     * Wait until the parent gives us
     * its actual width.
     */
    if (availableWidth <= 0) {
      return null;
    }

    /*
     * 1–4 columns:
     * Equal automatic width.
     *
     * 5+ columns:
     * Fixed comfortable width.
     */

    const columnWidth = shouldScroll
      ? 105
      : availableWidth / columnCount;

    const tableWidth = shouldScroll
      ? columnCount * columnWidth
      : availableWidth;

    const content = (
      <View
        style={[
          styles.table,
          {
            width: tableWidth,
          },
        ]}
      >
        {rows.map((row, rowIndex) => (
          <View
            key={`table-row-${rowIndex}`}
            style={[
              styles.tableRow,
              rowIndex === rows.length - 1 &&
                styles.tableLastRow,
            ]}
          >
            {row.cells.map(
              (cell, cellIndex) => (
                <Text
                  key={`table-cell-${rowIndex}-${cellIndex}`}
                
                  
                  selectable
selectionColor={styles.tableSelectionColor}
                  
                  style={[
                    styles.tableCell,
                    {
                      width: columnWidth,
                    },
                    cell.isHeader &&
                      styles.tableHeader,
                  ]}
                >
                  {renderInline(
                    cell.tokens,
                    `table-${rowIndex}-${cellIndex}`,
                    styles
                  )}
                </Text>
                
                

                
                
              )
            )}

            {Array.from({
              length:
                columnCount -
                row.cells.length,
            }).map(
              (_, emptyIndex) => (
                <Text
                  key={`table-empty-${rowIndex}-${emptyIndex}`}
                  style={[
                    styles.tableCell,
                    {
                      width: columnWidth,
                    },
                  ]}
                />
                

                
                
                
              )
            )}
          </View>
        ))}
      </View>
    );

    /*
     * Only 5+ columns get horizontal scrolling.
     */
    if (shouldScroll) {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          nestedScrollEnabled={true}
          style={styles.tableScroll}
        >
          {content}
        </ScrollView>
      );
    }

    return content;
  };

  /*
   * ============================================
   * MEASURE AVAILABLE WIDTH
   * ============================================
   */

  const MeasuredTable = () => {
    const [availableWidth, setAvailableWidth] =
      useState(0);
const [copied, setCopied] = useState(false);

    const handleLayout = (
      event: LayoutChangeEvent
    ) => {
      const width =
        event.nativeEvent.layout.width;

      if (width !== availableWidth) {
        setAvailableWidth(width);
      }
    };

    return (
      <View
        style={styles.tableWrapper}
        onLayout={handleLayout}
      >
        
            
        <Pressable
  onPress={async () => {
    await Clipboard.setStringAsync(tableText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }}
  style={styles.tableCopyButton}
>
  <Text style={styles.tableCopyText}>
    {copied ? "✓ Copied" : "Copy Table"}
  </Text>
</Pressable>
        
        <TableContent
          availableWidth={availableWidth}
        />
      </View>
    );
  };

  /*
   * ============================================
   * FIND TABLE CLOSE
   * ============================================
   */

  let nextIndex = startIndex;

  for (
    let i = startIndex;
    i < tokens.length;
    i++
  ) {
    if (
      tokens[i].type === "table_close"
    ) {
      nextIndex = i;
      break;
    }
  }

  return {
    node: <MeasuredTable />,
    nextIndex,
  };
};