import { StyleSheet, Platform } from "react-native";

export default (colors: any) =>
  StyleSheet.create({
    
  container: {
  position: "absolute",
  left: 12,
  right: 12,
  bottom: Platform.OS === "ios" ? 10 : 12,
},

    previewContainer: {
      marginBottom: 10,
    },
  });