{
  /*
const sleekTheme = {
  name: "sleek",

useGradient: true,

  colors: {
    // ---------------------------------
    // CORE
    // ---------------------------------

    background: "#FFE2F6",     // Soft, warm pink-tinged background
    backgroundGradient: [
  //"#F3E8FF", "#DDD6FE", "#C7D2FE", "#BAE6FD"


  "#FFEDD5", "#FED7AA", "#FBCFE8", "#E9D5FF"
     //"#051937", "#004D7A", "#008793", "#00BF72",
 //"#ffdbdb", //"#480082",//"#F2FBF9",
 //"#f4d6df", //"#703CFF", //"#F4F7FF",
 //"#e9d1e3", //"#FF409D", //"#F8F2FC",
 //"#decce7" //"#FFD200",
] as const,

brandTitle: "#F8FAFC",
    brandAccent: "#38BDF8",
    brandGradient: ["#38BDF8", "#818CF8", "#C084FC"] as const,

    surface: "#FFF2F6",        // Clean white card surfaces
    surfaceElevated: "#FFE5EE",// Warm pink floating containers
    primary: "#FF5DA3",
    // "#F3E8FF",
    // "#7DD3FC",
   //  "#FF2A85",        // Vibrant Hot Pink
    secondary: "#FF6B35",      // Bright Sunset Orange accent

    primarySoft: "#FFCCE1",    // Soft pastel pink fill
    primaryGlow: "#FF2A854D",  // Soft hot pink glow
    secondaryGlow: "#FF6B354D",// Soft orange glow

    text: "#2E1522",           // Deep plum-gray (crisp reading text)
    subText: "#7A5768",        // Soft pinkish-gray subtext
    textSecondary: "#7A5768",

    border: "#FFC2D8",         // Bright pink border highlight

    success: "#00B87C",
    warning: "#FF922D",        // Cheerful orange warning
    error: "#FF3358",

    // ---------------------------------
    // CARDS (Pink & Orange Focused)
    // ---------------------------------

    cardGreen: "#E6F8F3",     // Minty Fresh (keeps good contrast)
    cardBlue: "#FFEBF2",      // Soft Rose Pink
    cardOrange: "#FFF0E5",    // Creamy Peach / Soft Apricot
    cardPurple: "#FFE5F1",    // Bright Blossom Pink / Magenta Tint

cardBg: "rgba(30, 41, 59, 0.7)",
    cardBorder: "rgba(51, 65, 85, 0.8)",
    cardAccent: "#38BDF822",

    // ---------------------------------
    // CODE BLOCK (Light Pink & Warm Orange Accents)
    // ---------------------------------

    codeBackground: "#FFF5F8",
    codeHeader: "#FFDFEB",
    codeBorder: "#FFA3C5",

    codeText: "#2E1522",
    codeLineNumber: "#B8869E",

    codeKeyword: "#FF006E",    // Vivid Pink
    codeFunction: "#E85D04",   // Warm Orange
    codeString: "#00875A",    // Fresh Emerald
    codeNumber: "#FF6B35",    // Bright Orange
    codeComment: "#A3788E",

    codeVariable: "#E60067",   // Deep Rose Pink
    codeProperty: "#D94800",   // Burnt Orange
    codeType: "#B5179E",       // Pink-Purple

    codeOperator: "#FF3385",   // Mid-Pink
    codePunctuation: "#7A5768",

    codeTag: "#FF006E",
    codeAttribute: "#E85D04",

    codeConstant: "#FF6B35",
    codeBoolean: "#FF6B35",
    codeBuiltin: "#00897B",

    codeCopy: "#FF2A85",
    codeLanguage: "#7A5768",

    codeButton: "#FFD6E5",

    codeSegmentBackground: "#FFDFEB",
    codeSegmentActive: "#FFFFFF",
    codeSegmentActiveText: "#2E1522",
    codeSegmentText: "#7A5768",
    codeSegmentPressed: "#FFC2D8",
  },
};



export default sleekTheme;


*/
}

const sleekTheme = {
  name: "sleek",
  useGradient: true,

  colors: {
    // ─────────────────────────────
    // Background
    // ─────────────────────────────

    background: "#FFF1F7",

    backgroundGradient: [
      "#FFF1E8",
      "#FFE4F0",
      "#F7E7FF",
      "#E8E7FF",
    ] as const,

    // ─────────────────────────────
    // Branding
    // ─────────────────────────────

    /* brandTitle: "#FFF7FB",
 /* brandAccent: "#67D8FF",

  brandGradient: [
    "#67D8FF",
    "#8B8CFF",
    "#D18CFF",
  ] as const,
*/


    brandTitle: "#F43F87",
    brandAccent: "#C49BDD",
    // "#B78CFF",


    brandGradient: [
      // "#F43F87",
      "#D77BBF",
      "#A99AEF",
    ] as const,


    // ─────────────────────────────
    // Surfaces
    // ─────────────────────────────

    surface: "#FFF7FA",
    surfaceElevated: "#FFFFFF",

    // ─────────────────────────────
    // Accent
    // ─────────────────────────────

    primary: "#D77BBF",
    //"#F43F87",
    secondary: "#D99AB8",
    // "#F9735B",

    primarySoft: "#FFD6E6",
    primaryGlow: "#F43F8738",
    secondaryGlow: "#F9735B30",

    userBubble: "#DD8EC8",
    // "#FFF0F5", // "#FFE4EF",
    // ─────────────────────────────
    // Text
    // ─────────────────────────────

    text: "#321827",
    subText: "#806275",
    textSecondary: "#967A8D",


    // ─────────────────────────────
    // UI / Icons
    // ─────────────────────────────

    icon: "#321827",
    iconSecondary: "#806275",
    iconMuted: "#B69AAA",

    // ─────────────────────────────
    // Content on accent surfaces
    // ─────────────────────────────

    onPrimary: "#FFFFFF",

    // ─────────────────────────────
    // Interactive surfaces
    // ─────────────────────────────

    surfaceSelected: "#FFD6E6",
    surfacePressed: "#F7C4D8",

    // ─────────────────────────────
    // Borders / status
    // ─────────────────────────────

    border: "#FFFFFF",
    // "#F2C9DB",

    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF476F",

    // ─────────────────────────────
    // Cards
    // ─────────────────────────────

    cardGreen: "#E7F8F2",
    cardBlue: "#EAF4FF",
    cardOrange: "#FFF0E6",
    cardPurple: "#F5E9FF",

    cardBg: "rgba(255, 255, 255, 0.72)",
    cardBorder: "rgba(190, 150, 175, 0.32)",
    cardAccent: "#67D8FF24",

    // ─────────────────────────────
    // Code
    // ─────────────────────────────

    codeBackground: "#FFF8FB",
    codeHeader: "#FFEAF2",
    codeBorder: "#F2C5D8",

    codeText: "#352331",
    codeLineNumber: "#B69AAA",

    codeKeyword: "#D81B72",
    codeFunction: "#D95F02",
    codeString: "#087F5B",
    codeNumber: "#E76F00",
    codeComment: "#9B7B8E",

    codeVariable: "#C2185B",
    codeProperty: "#C2410C",
    codeType: "#9C36B5",

    codeOperator: "#E83E8C",
    codePunctuation: "#806275",

    codeTag: "#D81B72",
    codeAttribute: "#D95F02",

    codeConstant: "#E76F00",
    codeBoolean: "#E76F00",
    codeBuiltin: "#087F8C",

    codeCopy: "#E83E8C",
    codeLanguage: "#806275",

    codeButton: "#FFE0EC",

    codeSegmentBackground: "#FFEAF2",
    codeSegmentActive: "#FFFFFF",
    codeSegmentActiveText: "#321827",
    codeSegmentText: "#806275",
    codeSegmentPressed: "#F7C4D8",
  },
};

export default sleekTheme;