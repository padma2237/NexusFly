import React from "react";
import { Text, View } from "react-native";

import { renderInline } from "./renderInline";

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

  let rowIndex = -1;
  let cellIndex = -1;

  for (
    let i = startIndex;
    i < tokens.length;
    i++
  ) {
    const token = tokens[i];
    

    /*
     * ============================================
     * TABLE CLOSE
     * ============================================
     */
    if (token.type === "table_close") {
      break;
    }

    /*
     * ============================================
     * ROW OPEN
     * ============================================
     */
    if (token.type === "tr_open") {
      currentRow = {
        cells: [],
      };

      rows.push(currentRow);

      rowIndex += 1;
      cellIndex = -1;

      continue;
    }

    /*
     * ============================================
     * ROW CLOSE
     * ============================================
     */
    if (token.type === "tr_close") {
      currentCell = null;
      continue;
    }

    /*
     * ============================================
     * HEADER CELL OPEN
     * ============================================
     */
    if (token.type === "th_open") {
      if (!currentRow) {
        continue;
      }

      currentCell = {
        tokens: [],
        isHeader: true,
      };

      currentRow.cells.push(currentCell);

      cellIndex += 1;

      continue;
    }

    /*
     * ============================================
     * NORMAL CELL OPEN
     * ============================================
     */
    if (token.type === "td_open") {
      if (!currentRow) {
        continue;
      }

      currentCell = {
        tokens: [],
        isHeader: false,
      };

      currentRow.cells.push(currentCell);

      cellIndex += 1;

      continue;
    }

    /*
     * ============================================
     * CELL CLOSE
     * ============================================
     */
    if (
      token.type === "th_close" ||
      token.type === "td_close"
    ) {
      currentCell = null;
      continue;
    }

    /*
     * ============================================
     * INLINE CONTENT
     * ============================================
     */
    if (
      token.type === "inline" &&
      currentCell
    ) {
      currentCell.tokens =
        token.children ?? [];

      continue;
    }
  }

  /*
   * ============================================
   * FIND MAXIMUM COLUMN COUNT
   * ============================================
   */
  const columnCount = rows.reduce(
    (maximum, row) =>
      Math.max(maximum, row.cells.length),
    0
  );

  /*
   * ============================================
   * RENDER TABLE
   * ============================================
   */
  const table = (
    <View style={styles.table}>
      {rows.map((row, rowIndex) => (
      

        
          <View
  key={`table-row-${rowIndex}`}
  style={[
    styles.tableRow,
    rowIndex === rows.length - 1 &&
      styles.tableLastRow,
  ]}
>
          
          
          {row.cells.map((cell, cellIndex) => (
            <Text
              key={`table-cell-${rowIndex}-${cellIndex}`}
              selectable={true}
              style={[
                styles.tableCell,
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
          ))}

          {/*
           * Keep columns aligned if a malformed/
           * incomplete Markdown row has fewer cells.
           */}
          {Array.from({
            length:
              columnCount -
              row.cells.length,
          }).map((_, emptyIndex) => (
            <Text
              key={`table-empty-${rowIndex}-${emptyIndex}`}
              style={styles.tableCell}
            />
          ))}
        </View>
      ))}
    </View>
  );

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
    if (tokens[i].type === "table_close") {
      nextIndex = i;
      break;
    }
  }

  return {
    node: table,
    nextIndex,
  };
};