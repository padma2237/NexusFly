export interface Token {
  text: string;
  type: string;
}

/* ================================================= */
/* SYNTAX DEFINITIONS */
/* ================================================= */

const keywords = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "try",
  "catch",
  "finally",
  "throw",

  "import",
  "from",
  "export",
  "default",
  "as",

  "class",
  "extends",
  "implements",
  "new",
  "this",
  "super",

  "async",
  "await",

  "interface",
  "type",
  "public",
  "private",
  "protected",
  "readonly",
  "abstract",

  "typeof",
  "instanceof",
  "in",
  "of",
  "keyof",

  "def",
  "and",
  "or",
  "not",
]);

const types = new Set([
  "string",
  "number",
  "boolean",
  "void",
  "any",
  "unknown",
  "never",
  "object",

  "React",
  "ReactNode",

  "View",
  "Text",
  "TextInput",
  "Pressable",
  "ScrollView",
  "StyleSheet",
  "Modal",
]);

const builtins = new Set([
  "console",
  "Math",
  "JSON",
  "Date",
  "Array",
  "Object",
  "String",
  "Number",
  "Boolean",

  "parseInt",
  "parseFloat",

  "setTimeout",
  "setInterval",
  "clearTimeout",
  "clearInterval",
]);

const constants = new Set([
  "undefined",
  "null",
  "NaN",
  "Infinity",
]);

const booleans = new Set([
  "true",
  "false",
  "True",
  "False",
  "None",
]);

/* ================================================= */
/* TOKENIZER */
/* ================================================= */

export function tokenizeLine(
  line: string
): Token[] {
  const tokens: Token[] = [];

  /*
   * Order matters.
   *
   * Strings/comments are detected before
   * identifiers/operators inside them.
   */

  const regex =
    /(\/\/.*|\/\*.*\*\/|#.*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*|===|!==|=>|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||\?\?|\.{3}|\?\.|[+\-*\/%=<>!&|?:.,;()[\]{}])/g;

  let lastIndex = 0;

  let match: RegExpExecArray | null = null;

  /*
   * Basic JSX awareness.
   */
  let insideJsxTag = false;

  while (
    (match = regex.exec(line)) !== null
  ) {
    const index = match.index;
    const value = match[0];

    /* ----------------------------------------- */
    /* Plain text */
    /* ----------------------------------------- */

    if (index > lastIndex) {
      tokens.push({
        text: line.slice(
          lastIndex,
          index
        ),
        type: "plain",
      });
    }

    /* ----------------------------------------- */
    /* Comments */
    /* ----------------------------------------- */

    if (
      value.startsWith("//") ||
      value.startsWith("#") ||
      value.startsWith("/*")
    ) {
      tokens.push({
        text: value,
        type: "comment",
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* Strings */
    /* ----------------------------------------- */

    if (
      value.startsWith("'") ||
      value.startsWith('"') ||
      value.startsWith("`")
    ) {
      tokens.push({
        text: value,
        type: "string",
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* Numbers */
    /* ----------------------------------------- */

    if (/^\d/.test(value)) {
      tokens.push({
        text: value,
        type: "number",
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* JSX opening */
    /* ----------------------------------------- */

    if (value === "<") {
      insideJsxTag = true;

      tokens.push({
        text: value,
        type: "punctuation",
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* JSX closing */
    /* ----------------------------------------- */

    if (value === ">") {
      insideJsxTag = false;

      tokens.push({
        text: value,
        type: "punctuation",
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* Identifier */
    /* ----------------------------------------- */

    if (/^[A-Za-z_$]/.test(value)) {
      const before = line.slice(
        0,
        index
      );

      const previousChar =
        before.trimEnd().slice(-1);

      const after = line.slice(
        regex.lastIndex
      );

      const nextNonSpace =
        after.match(/^\s*(.)/)?.[1] ?? "";

      /* JSX tag name */

      const looksLikeJsxTag =
        previousChar === "<" ||
        (
          previousChar === "/" &&
          before.trimEnd().slice(-2, -1) === "<"
        );

      /* Property access */

      const isProperty =
        previousChar === "." ||
        before.trimEnd().endsWith("?.");

      /* Function */

      const isFunction =
        nextNonSpace === "(" &&
        !keywords.has(value);

      /* JSX attribute */

      const isAttribute =
        insideJsxTag &&
        nextNonSpace === "=";

      let type = "plain";

      if (booleans.has(value)) {
        type = "boolean";
      }

      else if (constants.has(value)) {
        type = "constant";
      }

      else if (keywords.has(value)) {
        type = "keyword";
      }

      else if (types.has(value)) {
        type = "type";
      }

      else if (builtins.has(value)) {
        type = "builtin";
      }

      else if (looksLikeJsxTag) {
        type = "tag";
      }

      else if (isAttribute) {
        type = "attribute";
      }

      else if (isProperty) {
        type = "property";
      }

      else if (isFunction) {
        type = "function";
      }

      else {
        type = "variable";
      }

      tokens.push({
        text: value,
        type,
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* Operators */
    /* ----------------------------------------- */

    if (
      /^(===|!==|=>|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||\?\?|\.{3}|\?\.|[+\-*\/%=<>!&|?:])$/.test(
        value
      )
    ) {
      tokens.push({
        text: value,
        type: "operator",
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* Punctuation */
    /* ----------------------------------------- */

    if (
      /^[.,;()[\]{}]$/.test(value)
    ) {
      tokens.push({
        text: value,
        type: "punctuation",
      });

      lastIndex = regex.lastIndex;
      continue;
    }

    /* ----------------------------------------- */
    /* Anything else */
    /* ----------------------------------------- */

    tokens.push({
      text: value,
      type: "plain",
    });

    lastIndex = regex.lastIndex;
  }

  /* ----------------------------------------- */
  /* Remaining text */
  /* ----------------------------------------- */

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
/* THEME TOKEN COLOR */
/* ================================================= */

export function getTokenStyle(
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

    function:
      colors.codeFunction ??
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

    variable:
      colors.codeVariable ??
      colors.text,

    property:
      colors.codeProperty ??
      colors.text,

    type:
      colors.codeType ??
      colors.secondary,

    operator:
      colors.codeOperator ??
      colors.text,

    punctuation:
      colors.codePunctuation ??
      colors.subText,

    tag:
      colors.codeTag ??
      colors.primary,

    attribute:
      colors.codeAttribute ??
      colors.primary,

    constant:
      colors.codeConstant ??
      colors.secondary,

    boolean:
      colors.codeBoolean ??
      colors.primary,

    builtin:
      colors.codeBuiltin ??
      colors.primary,
  };

  return {
    color:
      tokenColors[type] ??
      tokenColors.plain,
  };
}