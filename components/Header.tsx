import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Menu, Search, Settings } from "lucide-react-native";
import { useTheme } from "../theme/useTheme";

import { SquarePen } from "lucide-react-native";

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onNewChatPress?: () => void;
  onSettingsPress?: () => void;
}

export default function Header({
  title,
  onMenuPress,
  onNewChatPress,
  onSettingsPress,
}: HeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      
      

  <TouchableOpacity
    style={styles.leftButton}
    onPress={onMenuPress}>
    <Menu color={colors.text} size={24} />
  </TouchableOpacity>

  <Text style={styles.title}>
    ✦ NexusFly
  </Text>

  <View style={styles.rightButtons}>
    
    <TouchableOpacity
  style={styles.iconButton}
  onPress={onNewChatPress}>
  <SquarePen color={colors.text} size={22} />
</TouchableOpacity>

    <TouchableOpacity
      style={styles.iconButton}
      onPress={onSettingsPress}>
      <Settings color={colors.text} size={22} />
    </TouchableOpacity>
  </View>

</View>
    
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
  container: {
  position: "absolute",

  top: 30,
  left: 18,
  right: 18,

  zIndex: 100,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  paddingVertical: 10,

  backgroundColor: "transparent",
},

    
    
  leftButton: {
  position: "absolute",
  left: 0,

  width: 44,
  height: 44,
  borderRadius: 22,

  justifyContent: "center",
  alignItems: "center",

  backgroundColor: colors.surface,

  borderWidth: 1,
  borderColor: colors.border,

  elevation: 3,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
},

title: {
  alignSelf: "center",

  fontSize: 28,
letterSpacing: 0.8,
  fontWeight: "900",

  color: colors.text,
},

rightButtons: {
  position: "absolute",
  right: 0,

  flexDirection: "row",

  gap: 10,
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

  elevation: 3,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
},

});