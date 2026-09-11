const blossomTheme = {
  name: "blossom-light",
  useGradient: true,

  colors: {
    // ---------------------------------
    // CORE
    // ---------------------------------

    background: "#FFE2F6",
    // Soft, warm pink-tinged background

    backgroundGradient: [
      "#FFE2F6",
      "#FFF2F6",
      "#FFE5EE",
      "#FFD6E5",
    ] as const,

    brandTitle: "#2E1522",
    brandAccent: "#FF2A85",
    brandGradient: [
      "#FF2A85",
      "#FF6B9E",
      "#B5179E",
    ] as const,

    surface: "#FFF2F6",
    // Clean white card surfaces
    surfaceElevated: "#FFE5EE",
    // Warm pink floating containers
    cyan: "#00FFFF",
    primary: "#FF2A85",
    // Vibrant Hot Pink
    secondary: "#FF6B35",
    // Bright Sunset Orange accent
    userBubble: "#FF83B8",
   // "#FF5DA3",

    primarySoft: "#FFCCE1",
    // Soft pastel pink fill
    primaryGlow: "#FF2A854D",
    // Soft hot pink glow
    secondaryGlow: "#FF6B354D",
    // Soft orange glow

    text: // "#0000FF",
    "#2E1522",
    // Deep plum-gray (crisp reading text)
    subText: "#7A5768",
    // Soft pinkish-gray subtext
    textSecondary: "#7A5768",

    icon: "#2E1522",
    iconSecondary: "#7A5768",
    iconMuted: "#B8869E",

    onPrimary: "#FFFFFF",

    surfaceSelected: "#FFCCE1",
    surfacePressed: "#FFC2D8",

    border: "#FFC2D8",
    // Bright pink border highlight

    success: "#00B87C",
    warning: "#FF922D",
    // Cheerful orange warning
    error: "#FF3358",

    // ---------------------------------
    // CARDS (Pink & Orange Focused)
    // ---------------------------------

    cardGreen: "#E6F8F3",
    // Minty Fresh (keeps good contrast)
    cardBlue: "#FFEBF2",
    // Soft Rose Pink
    cardOrange: "#FFF0E5",
    // Creamy Peach / Soft Apricot
    cardPurple: "#FFE5F1",
    // Bright Blossom Pink / Magenta Tint

    cardBg: "rgba(255, 255, 255, 0.72)",
    cardBorder: "rgba(255, 194, 216, 0.7)",
    cardAccent: "#FF2A8524",

    // ---------------------------------
    // CODE BLOCK (Light Pink & Warm Orange Accents)
    // ---------------------------------

    codeBackground: "#FFF5F8",
    codeHeader: "#FFDFEB",
    codeBorder: "#FFA3C5",

    codeText: "#2E1522",
    codeLineNumber: "#B8869E",

    codeKeyword: "#FF006E",
    // Vivid Pink
    codeFunction: "#E85D04",
    // Warm Orange
    codeString: "#00875A",
    // Fresh Emerald
    codeNumber: "#FF6B35",
    // Bright Orange
    codeComment: "#A3788E",

    codeVariable: "#E60067",
    // Deep Rose Pink
    codeProperty: "#D94800",
    // Burnt Orange
    codeType: "#B5179E",
    // Pink-Purple

    codeOperator: "#FF3385",
    // Mid-Pink
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

export default blossomTheme;