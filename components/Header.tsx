import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Menu, Search, Settings } from "lucide-react-native";
import Colors from "../constants/colors";

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onSettingsPress?: () => void;
}

export default function Header({
  title,
  onMenuPress,
  onSearchPress,
  onSettingsPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Menu color={Colors.text} size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right}>
        <TouchableOpacity onPress={onSearchPress}>
          <Search color={Colors.text} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSettingsPress}
          style={{ marginLeft: 16 }}>
          <Settings color={Colors.text} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "700",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },
});