import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { X } from "lucide-react-native";

import { useTheme } from "../../theme/useTheme";

interface Props {
  image: any;
  onRemove: () => void;
  onPress: () => void;
}

export default function ImagePreviewBar({
  image,
  onRemove,
  onPress,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!image) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(180)}
      exiting={FadeOut.duration(150)}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.close}
        onPress={onRemove}
      >
        <X size={14} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      marginBottom: 10,
      position: "relative",
    },

    image: {
      width: 120,
      height: 120,
      borderRadius: 18,
      resizeMode: "cover",
      borderWidth: 1,
      borderColor: colors.border,
    },

    close: {
      position: "absolute",
      top: -8,
      right: -8,

      width: 24,
      height: 24,
      borderRadius: 12,

      backgroundColor: "rgba(0,0,0,0.7)",

      justifyContent: "center",
      alignItems: "center",
    },
  });