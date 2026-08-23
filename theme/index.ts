import darkTheme from "./dark";
import lightTheme from "./light";
import experimentalTheme from "./experimental";
import blossomTheme from "./blossom";
import sleekTheme from "./sleek";
import oracleTheme from "./oracle";


export type BaseTheme = {
  name: string;
  useGradient?: boolean;

  colors: {
    background: string;

    backgroundGradient?: readonly [
      string,
      string,
      ...string[]
    ];

    surface: string;
    surfaceElevated?: string;

    primary: string;
    secondary: string;

    primarySoft?: string;
    primaryGlow?: string;
    secondaryGlow?: string;

    text: string;
    subText: string;
    textSecondary: string;

    border: string;

    success: string;
    warning: string;
    error: string;

    cardGreen: string;
    cardBlue: string;
    cardOrange: string;
    cardPurple: string;

    codeBackground: string;
    codeHeader: string;
    codeBorder: string;

    codeText: string;
    codeLineNumber: string;

    codeKeyword: string;
    codeFunction: string;
    codeString: string;
    codeNumber: string;
    codeComment: string;

    codeVariable: string;
    codeProperty: string;
    codeType: string;

    codeOperator: string;
    codePunctuation: string;

    codeTag: string;
    codeAttribute: string;

    codeConstant: string;
    codeBoolean: string;
    codeBuiltin: string;

    codeCopy: string;
    codeLanguage: string;

    codeButton: string;

    codeSegmentBackground: string;
    codeSegmentActive: string;
    codeSegmentActiveText: string;
    codeSegmentText: string;
    codeSegmentPressed: string;
  };
};


// Enforce your new type on the themes map
export const themes: Record<string, BaseTheme> = {
  dark: darkTheme,
  light: lightTheme,
  experimental: experimentalTheme,
  blossom: blossomTheme,
  sleek: sleekTheme,
  oracle: oracleTheme,
};

export type ThemeName = keyof typeof themes | "system";
