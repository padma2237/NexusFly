import { StyleSheet } from "react-native";
import { COLLAPSED_RADIUS, COMPOSER_MIN_HEIGHT } from "./config/constants";

// Pass theme colors dynamically
export const getStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      
      
      position: "absolute",
left: 16,
right: 16,
bottom: 10,

      
      borderRadius: COLLAPSED_RADIUS || 28,
      minHeight: COMPOSER_MIN_HEIGHT || 52,
      backgroundColor: colors?.surface || "#0f172a", // Safe access with fallback
      borderWidth: 1,
      borderColor: colors?.border || "#1e293b",
      paddingHorizontal: 12,
      justifyContent: "center",
      overflow: "hidden",
    },
  });
