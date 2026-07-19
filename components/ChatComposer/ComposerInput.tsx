import React from "react";
import {
  TextInput,
  StyleSheet,
} from "react-native";

import { useTheme } from "../../theme/useTheme";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function ComposerInput({
  value,
  onChangeText,
}: Props) {

  const { colors } = useTheme();

  return (
    
    <TextInput
  value={value}
  onChangeText={onChangeText}
  placeholder="Message NexusFly..."
  placeholderTextColor={colors.subText}
  multiline
  textAlignVertical="center"
  scrollEnabled={false}
  style={[
    styles.input,
    {
      color: colors.text,
    },
  ]}
/>
    
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 22,

    minHeight: 26,
    maxHeight: 140,

    paddingVertical: 0,
    marginBottom: 2,
  },
});