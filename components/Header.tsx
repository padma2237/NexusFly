import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from "react-native-svg";
import { Menu, Settings, SquarePen } from "lucide-react-native";
import { useTheme } from "../theme/useTheme";

interface HeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onNewChatPress?: () => void;
  onSettingsPress?: () => void;
}

export default function Header({
  onMenuPress,
  onNewChatPress,
  onSettingsPress,
}: HeaderProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  // Dynamically uses theme's brandGradient, or falls back to theme's primary/secondary colors
  const gradientColors = (colors as any).brandGradient || [
    colors.primary,
    colors.secondary || colors.primary,
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.headerContent}>
        {/* Left Container */}
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onMenuPress}
            activeOpacity={0.7}
          >
            <Menu color={colors.text} size={22} />
          </TouchableOpacity>
        </View>

        {/* Centered Logo Container */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>✦</Text>

          {/* SVG Gradient Title with exact SVG canvas sizing */}
          <View style={styles.svgWrapper}>
            <Svg height="26" width="130">
              <Defs>
                <LinearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor={gradientColors[0]} />
                  <Stop offset="100%" stopColor={gradientColors[gradientColors.length - 1]} />
                </LinearGradient>
              </Defs>
              <SvgText
                fill="url(#titleGrad)"
                fontSize="24"
                fontWeight="800"
                x="0"
                y="19"
              >
                Padma
              </SvgText>
            </Svg>
          </View>

          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
        </View>

        {/* Right Container */}
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNewChatPress}
            activeOpacity={0.7}
          >
            <SquarePen color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSettingsPress}
            activeOpacity={0.7}
          >
            <Settings color={colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      paddingHorizontal: 16,
      backgroundColor: "transparent",
    },
    headerContent: {
      height: 44,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    leftContainer: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      justifyContent: "center",
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    
    logoIcon: {
  color: colors.brandAccent || colors.primary,
  fontSize: 15,
  marginRight: 2,
  marginTop: 1,
  includeFontPadding: false,
},
svgWrapper: {
  height: 26,
  width: 102,
  justifyContent: "center",
},
aiBadge: {
  marginLeft: 2,
  paddingHorizontal: 4,
  paddingVertical: 1,
  backgroundColor: colors.surface,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: colors.border,
  alignSelf: "center",
},


    aiBadgeText: {
      fontSize: 10,
      fontWeight: "800",
      color: colors.brandAccent || colors.primary,
      includeFontPadding: false,
    },
    rightContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    iconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
  });
