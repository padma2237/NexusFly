import darkTheme from "./dark";
import lightTheme from "./light";
import experimentalTheme from "./experimental";
import blossomTheme from "./blossom";
import sleekTheme from "./sleek";
import oracleTheme from "./oracle";
import charmPetalTheme from "./charmPetal";


export type BaseTheme = {
  name: string;
  useGradient: boolean;

  
    
    
    colors: {
  background: string;

  brandTitle: string;
  brandAccent: string;
  brandGradient: readonly [
    string,
    string,
    ...string[]
  ];

  backgroundGradient: readonly [
    string,
    string,
    ...string[]
  ];
    
    
    

    surface: string;
    surfaceElevated: string;

    primary: string;
    secondary: string;
    userBubble: string;



    primarySoft: string;
    primaryGlow: string;
    secondaryGlow: string;

    text: string;
    subText: string;
    textSecondary: string;
    
    // UI / Icons
icon: string;
iconSecondary: string;
iconMuted: string;

// Content on accent surfaces
onPrimary: string;

// Interactive surfaces
surfaceSelected: string;
surfacePressed: string;

    border: string;

    success: string;
    warning: string;
    error: string;

    cardGreen: string;
    cardBlue: string;
    cardOrange: string;
    cardPurple: string;


cardBg: string;
cardBorder: string;
cardAccent: string;

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
  charmPetal: charmPetalTheme,
};

export type ThemeName = keyof typeof themes | "system";
