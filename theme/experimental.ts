{/*
const experimentalTheme = {
  name: "experimental",
  useGradient: true,
  colors: {
    background: "#F0FDF4",
    
    backgroundGradient: [
      "#CCFBFF", 
      "#ECEBA7", 
      "#ABF1C1"
    ] as const,

    surface: "#DCFCE7",
    primary: "#22C55E",
    //"#4ADE80",
             //"#15803D",
    secondary: "#166534",
    text: "#14532D",
    subText: "#166534",
    textSecondary: "#3F6212",
    border: "#BBF7D0",
    success: "#166534",
    warning: "#B45309",
    error: "#991B1B",

    cardGreen: "#DCFCE7",
    cardBlue: "#E0F2FE",
    cardOrange: "#FFEDD5",
    cardPurple: "#F3E8FF",

    codeBackground: "#F8FAFC",
    codeHeader: "#F1F5F9",
    codeBorder: "#DCFCE7",
                // "#E2E8F0",
    codeText: "#334155",
    codeLineNumber: "#94A3B8",
    codeKeyword: "#0284C7",
    codeFunction: "#15803D",
    codeString: "#16A34A",
    codeNumber: "#EA580C",
    codeComment: "#64748B",
    codeVariable: "#2563EB",
    codeProperty: "#7C3AED",
    codeType: "#0369A1",
    codeOperator: "#EA580C",
    codePunctuation: "#475569",
    codeTag: "#15803D",
    codeAttribute: "#2563EB",
    codeConstant: "#7C3AED",
    codeBoolean: "#EA580C",
    codeBuiltin: "#0891B2",
    codeCopy: "#15803D",
    codeLanguage: "#475569",
    codeButton: "#E2E8F0",
    codeSegmentBackground: "#E2E8F0",
    codeSegmentActive: "#BBF7D0",
    codeSegmentActiveText: "#14532D",
    codeSegmentText: "#475569",
    codeSegmentPressed: "#86EFAC",
  },
};

export default experimentalTheme;

*/}


{/*


 const experimentalTheme = {
  name: "experimental",

  useGradient: true,

  colors: {
    background: "#FFF3E0",




    backgroundGradient: [

// "#B3EEFA", "#B7D2F7", "#C0BEF2", "#D8B5EC" Good✓
//"#A5F3FC", "#C084FC", "#F472B6", "#FB923C" ✓
     // "#CCFBFF", "#ECEBA7", "#ABF1C1"

 // "#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8" //Blue

// "#54E38E", "#00A8FF" ✓✓✓✓

  "#E0F2FE", "#BAE6FD", "#F5D0FE", "#FCE7F3"




    ] as const,


    // header: "FF000F",

    surface: "#FFE0B2",

    primary: "#E65100",
    secondary: "#F57C00",

    text: 
    "#3E2723",
    subText: "#5D4037",
    textSecondary: "#795548",

    border: "#FFB74D",

    success: "#2E7D32",
    warning: "#EF6C00",
    error: "#C62828",

    cardGreen: "#E8F5E9",
    cardBlue: "#E3F2FD",
    cardOrange: "#FFE0B2",
    cardPurple: "#F3E5F5",

    // ---------------------------------
    // CODE BLOCK (Creamy Orange Style)
    // ---------------------------------

    codeBackground: "#FFF8E1",
    codeHeader: "#FFE0B2",
    codeBorder: "#FFE082",

    codeText: "#4E342E",
    codeLineNumber: "#A1887F",

    codeKeyword: "#D84315",
    codeFunction: "#E65100",
    codeString: "#2E7D32",
    codeNumber: "#AD1457",
    codeComment: "#8D6E63",

    codeVariable: "#1565C0",
    codeProperty: "#6A1B9A",
    codeType: "#283593",

    codeOperator: "#D84315",
    codePunctuation: "#5D4037",

    codeTag: "#E65100",
    codeAttribute: "#1565C0",

    codeConstant: "#6A1B9A",
    codeBoolean: "#AD1457",
    codeBuiltin: "#00838F",

    codeCopy: "#E65100",
    codeLanguage: "#795548",

    codeButton: "#FFE0B2",

    codeSegmentBackground: "#FFE0B2",
    codeSegmentActive: "#FFB74D",
    codeSegmentActiveText: "#3E2723",
    codeSegmentText: "#795548",
    codeSegmentPressed: "#FFA726",
  },
};

export default experimentalTheme;

*/}



const experimentalTheme = {
  name: "experimental",

  useGradient: true,

  colors: {
    background: "#FEFCE8", // Soft warm yellow

    backgroundGradient: [
            
             
      "#FEF9C3", // Light Yellow
      "#FFEDD5", 
             // Soft Orange
      "#E0F2FE", // Soft Sky Blue
      "#BAE6FD"  // Light Ocean Blue
    ] as const,
    
    brandTitle: "#F43F87",
brandAccent: "#FF0000",
//"#FF8C00",
//"#B78CFF",
brandGradient: [
 // "#FF7F50",
  "#FF8C00",
  
    "#FF0000",
//  "#F43F87",
  //"#D77BBF",
  //"#A99AEF",
] as const,

    surface: "#FFF7ED", // Warm cream/orange tint

    primary://"#000000", 
    "#FF7F50",
   // "#0284C7",   // Vivid Blue
    secondary: "#EA580C", // Vibrant Orange

    text: "#0F172A",          // Deep Navy-Slate
    subText: "#334155",       // Slate
    textSecondary: "#475569",  // Muted Slate


icon: "#14532D",
iconSecondary: "#166534",
iconMuted: "#64748B",

onPrimary: "#FFFFFF",

surfaceSelected: "#DCFCE7",
surfacePressed: "#86EFAC",



surfaceElevated: "#FFFFFF",

primarySoft: "#FFEDD5",
primaryGlow: "#FF7F5038",
secondaryGlow: "#EA580C30",






    userBubble:"#FFFFFF",
    //"#0284C7", // Added: Accent Blue for user chat bubbles

    border: "#FFFFFF",
    //"#FDE047", // Electric Yellow border

    success: "#16A34A",
    warning: "#D97706",
    error: "#DC2626",

    cardGreen: "#F0FDF4",
    cardBlue: "#E0F2FE",
    cardOrange: "#FFEDD5",
    cardPurple: "#FAF5FF",
    
    cardBg: "rgba(255, 255, 255, 0.72)",
cardBorder: "rgba(255, 255, 255, 0.8)",
cardAccent: "#FF8C0024",

    // ---------------------------------
    // CODE BLOCK (Yellow / Blue Style)
    // ---------------------------------

    codeBackground: "#0F172A", // Dark Slate Blue contrast for code
    codeHeader: "#1E293B",
    codeBorder: "#38BDF8",     // Bright Blue accent border

    codeText: "#F8FAFC",
    codeLineNumber: "#64748B",

    codeKeyword: "#FACC15",   // Bright Yellow
    codeFunction: "#38BDF8",  // Bright Blue
    codeString: "#FB923C",    // Soft Orange
    codeNumber: "#F472B6",
    codeComment: "#64748B",

    codeVariable: "#38BDF8",
    codeProperty: "#FDE047",
    codeType: "#818CF8",

    codeOperator: "#FACC15",
    codePunctuation: "#94A3B8",

    codeTag: "#FB923C",
    codeAttribute: "#38BDF8",

    codeConstant: "#FACC15",
    codeBoolean: "#FB923C",
    codeBuiltin: "#38BDF8",

    codeCopy: "#38BDF8",
    codeLanguage: "#94A3B8",

    codeButton: "#1E293B",

    codeSegmentBackground: "#1E293B",
    codeSegmentActive: "#0284C7",
    codeSegmentActiveText: "#FFFFFF",
    codeSegmentText: "#94A3B8",
    codeSegmentPressed: "#0369A1",
  },
};

export default experimentalTheme;



{/*
const experimentalTheme = {
  name: "experimental",

  useGradient: true,

  colors: {
    background: "#FEFCE8",

    backgroundGradient: [
      "#FFFBEB", // Soft Warm Cream/Yellow (Top)
      "#FFF7ED", // Warm Sunset Peach
      "#E0F2FE", // Soft Sky Blue
      "#BAE6FD"  // Light Ocean Blue (Bottom)
    ] as const,

    surface: "#FFFFFF",

    primary: "#0284C7",   // Sky Blue accent
    secondary: "#F97316", // Warm Orange accent

    text: "#0F172A",          // Deep Slate
    subText: "#475569",       // Medium Slate
    textSecondary: "#64748B",  // Soft Slate

    userBubble: "#0284C7", // Bright Accent Blue for user chat bubbles

    border: "#FDE68A", // Softened Amber/Warm Yellow border (matches background seamlessly)

    success: "#16A34A",
    warning: "#EA580C",
    error: "#DC2626",

    // Option Cards (Matching background tints with subtle, cohesive borders)
    cardGreen: "#F0FDF4",
    cardBlue: "#F0F9FF",
    cardOrange: "#FFF7ED",
    cardPurple: "#FAF5FF",

    cardBorderGreen: "#BBF7D0",
    cardBorderBlue: "#BAE6FD",
    cardBorderOrange: "#FED7AA",
    cardBorderPurple: "#E9D5FF",

    // ---------------------------------
    // CODE BLOCK (Navy & Orange/Yellow)
    // ---------------------------------

    codeBackground: "#0F172A",
    codeHeader: "#1E293B",
    codeBorder: "#38BDF8",

    codeText: "#F8FAFC",
    codeLineNumber: "#64748B",

    codeKeyword: "#FACC15",   // Warm Yellow
    codeFunction: "#38BDF8",  // Ocean Blue
    codeString: "#FB923C",    // Soft Orange
    codeNumber: "#F472B6",
    codeComment: "#64748B",

    codeVariable: "#38BDF8",
    codeProperty: "#FDE047",
    codeType: "#818CF8",

    codeOperator: "#FACC15",
    codePunctuation: "#94A3B8",

    codeTag: "#FB923C",
    codeAttribute: "#38BDF8",

    codeConstant: "#FACC15",
    codeBoolean: "#FB923C",
    codeBuiltin: "#38BDF8",

    codeCopy: "#38BDF8",
    codeLanguage: "#94A3B8",

    codeButton: "#1E293B",

    codeSegmentBackground: "#1E293B",
    codeSegmentActive: "#0284C7",
    codeSegmentActiveText: "#FFFFFF",
    codeSegmentText: "#94A3B8",
    codeSegmentPressed: "#0369A1",
  },
};

export default experimentalTheme;
*/}