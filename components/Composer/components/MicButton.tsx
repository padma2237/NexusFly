import React, {
  useEffect
} from "react";

import {
  Animated,
  TouchableOpacity,
  View
} from "react-native";

import {
  Ionicons
} from "@expo/vector-icons";

import styles from "../styles";

import {
  useComposerTheme
} from "../config/useComposerTheme";

import {
  ICON_SIZE
} from "../config/constants";


export default function MicButton({
  onPress,
  isListening = false,
}: {
  onPress?: () => void;
  isListening?: boolean;
}) {

  const theme = useComposerTheme();

  const pulse = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isListening) {
      pulse.stopAnimation();
      pulse.setValue(1);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  },
    [isListening,
      pulse]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.iconButton}
      onPress={onPress}
      >

      
        
        
        <Animated.View
  style={[
    styles.iconContent,
    {
      transform: [{ scale: pulse }],
      backgroundColor: isListening
        ? theme.iconActive
        : "transparent",
      borderRadius: 24,
      padding: isListening ? 6 : 0,
    },
  ]}
>
        
        
        <Ionicons
          name={isListening ? "mic": "mic-outline"}
          size={ICON_SIZE}
          color={isListening ? theme.sendIcon: theme.text}
          />
      </Animated.View>

    </TouchableOpacity>
  );
}