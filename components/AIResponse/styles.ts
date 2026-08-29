import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },

    response: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 24,
    },

    
    
    heading1: {
  color: colors.text,
  fontSize: 24,
  lineHeight: 32,
  fontWeight: "700",
},

heading2: {
  color: colors.text,
  fontSize: 21,
  lineHeight: 29,
  fontWeight: "700",
},

heading3: {
  color: colors.text,
  fontSize: 19,
  lineHeight: 27,
  fontWeight: "700",
},

heading4: {
  color: colors.text,
  fontSize: 18,
  lineHeight: 26,
  fontWeight: "700",
},

heading5: {
  color: colors.text,
  fontSize: 17,
  lineHeight: 25,
  fontWeight: "700",
},

heading6: {
  color: colors.text,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: "700",
},
    
    
    strike: {
  textDecorationLine: "line-through",
},
    

    strong: {
      fontWeight: "700",
      color: colors.text,
    },

    em: {
      fontStyle: "italic",
      color: colors.text,
    },

    inlineCode: {
      fontFamily: "monospace",
      color: colors.text,
    },


    codeContainer: {
      width: "100%",
      marginVertical: 4,
    },
    
    
    listItem: {
  color: colors.text,
  fontSize: 16,
  lineHeight: 24,
  marginLeft: 4,
},

listMarker: {
  color: colors.text,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: "600",
},

    table: {
      width: "100%",
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      overflow: "hidden",
    },

    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    tableCell: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: colors.text,
      fontSize: 15,
      lineHeight: 21,
    },

    tableHeader: {
      fontWeight: "700",
      color: colors.text,
    },

    link: {
      color: colors.primary,
      textDecorationLine: "underline",
    },
  });