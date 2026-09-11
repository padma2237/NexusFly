const lightTheme = {
  name: "light",
  useGradient: false,

  colors: {
    // ─────────────────────────────
    // Background
    // ─────────────────────────────

    background: "#F1F9F9",

    backgroundGradient: [
      "#F1F9F9",

      "#E2F1F5",

      "#E0F2FE",

      "#F1F9F9",

    ] as const,

    // ─────────────────────────────
    // Branding
    // ─────────────────────────────

    brandAccent: "#64748B",
    brandTitle: "#0F172A",
    
    // brandAccent: "#0284C7",

    //brandGradient: [
    //  "#0284C7",
    //  "#2563EB",
    // "#7C3AED",
    //    ] as const,

    // brandGradient: ["#0284C7", "#2563EB", "#7C3AED"] as const,

    brandGradient: [
      //  "#000000",
      "#64748B",
      "#7C83A8",
      "#000000",
    ] as const,

    // ─────────────────────────────
    // Surfaces
    // ─────────────────────────────

    surface: "#FFFFFF",
    surfaceElevated: "#FFFFFF",

    // ─────────────────────────────
    // Accent
    // ─────────────────────────────

    primary: "#000000",
    // "#0284C7",
    // "#334155",
    secondary: "#3B82F6",

    primarySoft: "#E0F2FE",
    primaryGlow: "#0284C738",
    secondaryGlow: "#3B82F630",
    
    userBubble: "#E0F2FE",

    // ─────────────────────────────
    // Text
    // ─────────────────────────────

    text: "#0F172A",
    subText: "#475569",
    textSecondary: "#94A3B8",

    // ─────────────────────────────
    // UI / Icons
    // ─────────────────────────────

    icon: "#0F172A",
    iconSecondary: "#475569",
    iconMuted: "#94A3B8",

    // ─────────────────────────────
    // Content on accent surfaces
    // ─────────────────────────────

    onPrimary: "#FFFFFF",

    // ─────────────────────────────
    // Interactive surfaces
    // ─────────────────────────────

    surfaceSelected: "#E0F2FE",
    surfacePressed: "#CBD5E1",

    // ─────────────────────────────
    // Borders / status
    // ─────────────────────────────

    border: "#E2E8F0",
    success: "#16a34a",
    warning: "#d97706",
    error: "#dc2626",

    // ─────────────────────────────
    // Cards
    // ─────────────────────────────

    cardGreen: "#DFF6E4",
    cardBlue: "#E5F1FF",
    cardOrange: "#FFF2D8",
    cardPurple: "#F4E8FF",

    cardBg: "rgba(255, 255, 255, 0.85)",
    cardBorder: "rgba(226, 232, 240, 0.8)",
    cardAccent: "#0284C71F",

    // ─────────────────────────────
    // Code
    // ─────────────────────────────

    codeBackground: "#F8FAFC",
    codeHeader: "#F1F5F9",
    codeBorder: "#CBD5E1",
    codeText: "#1E293B",
    codeLineNumber: "#94A3B8",
    codeKeyword: "#7C3AED",
    codeFunction: "#2563EB",
    codeString: "#047857",
    codeNumber: "#B45309",
    codeComment: "#64748B",
    codeVariable: "#DB2777",
    codeProperty: "#0891B2",
    codeType: "#4F46E5",
    codeOperator: "#DB2777",
    codePunctuation: "#475569",
    codeTag: "#DB2777",
    codeAttribute: "#2563EB",
    codeConstant: "#7C3AED",
    codeBoolean: "#B45309",
    codeBuiltin: "#0891B2",
    codeCopy: "#2563EB",
    codeLanguage: "#64748B",
    codeButton: "#E2E8F0",
    codeSegmentBackground: "#E2E8F0",
    codeSegmentActive: "#FFFFFF",
    codeSegmentActiveText: "#0F172A",
    codeSegmentText: "#64748B",
    codeSegmentPressed: "#CBD5E1",
  },
};

export default lightTheme;