import React from "react";
import Animated from "react-native-reanimated";

import { useTheme } from "../../theme/ThemeContext"; // Adjust path if needed
import { getStyles } from "./ComposerCard.styles";

interface ComposerCardProps {
  animatedStyle: any;
  children: React.ReactNode;
}

export default function ComposerCard({
  animatedStyle,
  children,
}: ComposerCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      {children}
    </Animated.View>
  );
}