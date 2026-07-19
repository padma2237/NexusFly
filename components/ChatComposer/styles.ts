 import { StyleSheet, Platform } from "react-native";

export default (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",

      left: 14,
      right: 14,
      bottom: Platform.OS === "ios" ? 10 : 14,

      backgroundColor: colors.surface,

      borderRadius: 28,

      paddingHorizontal: 10,
      paddingTop: 8,
      paddingBottom: 8,

      borderWidth: 1,
      borderColor: colors.border,

      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: {
        width: 0,
        height: 8,
      },

      elevation: 10,
    },

    inputWrapper: {
      flexDirection: "row",
      alignItems: "flex-end",
    },

    input: {
      flex: 1,

      color: colors.text,

      fontSize: 16,

      lineHeight: 22,

      paddingVertical: 10,
      paddingHorizontal: 4,

      minHeight: 24,
      maxHeight: 150,
    },

    previewContainer: {
      marginBottom: 10,
    },

    previewImage: {
      width: 90,
      height: 90,

      borderRadius: 18,
    },

    actions: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginTop: 8,
    },

    leftActions: {
      flexDirection: "row",

      alignItems: "center",

      gap: 6,
    },

    circleButton: {
      width: 40,
      height: 40,

      borderRadius: 20,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: colors.background,

      borderWidth: 1,
      borderColor: colors.border,
    },

    sendButton: {
      width: 42,
      height: 42,

      borderRadius: 21,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: colors.primary,
    },
  });