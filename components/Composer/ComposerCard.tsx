import React from "react";
import { LayoutChangeEvent } from "react-native";
import Animated from "react-native-reanimated";

import { useTheme } from "../../theme/ThemeContext"; // Adjust path if needed
import { getStyles } from "./ComposerCard.styles";

interface ComposerCardProps {
  animatedStyle: any;
  children: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export default function ComposerCard({
  animatedStyle,
  children,
  onLayout,
}: ComposerCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Animated.View
    onLayout={onLayout}
    style={[styles.card, animatedStyle]}>
      {children}
    </Animated.View>
  );
}