import React, {
  useEffect,
  useRef
} from "react";
import {
  Animated,
  View
} from "react-native";
import styles from "../styles";
import SendButton from "./SendButton";
import MicButton from "./MicButton";
import {
  RightActionsProps
} from "../types";
import {
  useComposerTheme
} from "../config/useComposerTheme";

export default function RightActions({
  hasText,
  isLoading,
  isListening,
  isTranscribing,
  onSend,
  onStop,
  onMicPress,
}: RightActionsProps) {

  const theme = useComposerTheme();

  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;


  useEffect(() => {
    if (!isTranscribing) {
      dot1.setValue(0.3);
      dot2.setValue(0.3);
      dot3.setValue(0.3);
      return;
    }

    const animateDot = (
      dot: Animated.Value,
      delay: number
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),

          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),

          Animated.timing(dot, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),

          Animated.delay(600),
        ])
      );
    };

    const animation1 = animateDot(dot1, 0);
    const animation2 = animateDot(dot2, 200);
    const animation3 = animateDot(dot3, 400);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  },
    [isTranscribing,
      dot1,
      dot2,
      dot3]);


  return (
    <View style={styles.rightActions}>
      {isLoading ? (
        <SendButton
          hasText={hasText}
          isLoading={isLoading}
          onSend={onSend}
          onStop={onStop}
          />
      ): isTranscribing ? (


        <View style={styles.transcribingIndicator}>
          <Animated.View
            style={[
              styles.transcribingDot,
              { opacity: dot1,
              backgroundColor: theme.iconActive, },
            ]}
            />

          <Animated.View
            style={[
              styles.transcribingDot,
              { opacity: dot2,
              backgroundColor: theme.iconActive, },
            ]}
            />

          <Animated.View
            style={[
              styles.transcribingDot,
              { opacity: dot3,
              backgroundColor: theme.iconActive, },
            ]}
            />
        </View>



      ): isListening ? (
        <MicButton
          onPress={onMicPress}
          isListening={isListening}
          />
      ): hasText ? (
        <SendButton
          hasText={hasText}
          isLoading={isLoading}
          onSend={onSend}
          onStop={onStop}
          />
      ): (
        <MicButton
          onPress={onMicPress}
          isListening={isListening}
          />
      )}
    </View>
  );
}