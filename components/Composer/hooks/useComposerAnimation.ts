import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import {
  useEffect
} from "react";

import {
  DURATION_NORMAL,
  EASE_OUT,
} from "../config/animations";

import {
  COLLAPSED_RADIUS,
  EXPANDED_RADIUS,
} from "../config/constants";

interface Params {
  isExpanded: boolean;
  inputHeight: number;
}

export default function useComposerAnimation({
  isExpanded,
  inputHeight,
}: Params) {
  /*
  |--------------------------------------------------------------------------
  | Progress
  |--------------------------------------------------------------------------
  */

  const progress = useSharedValue(
    isExpanded ? 1: 0
  );

  const animatedHeight = useSharedValue(inputHeight);

  useEffect(() => {
    progress.value = withTiming(
      isExpanded ? 1: 0,
      {
        duration: DURATION_NORMAL,
        easing: EASE_OUT,
      }
    );
  }, [isExpanded]);

  useEffect(() => {
    animatedHeight.value = withTiming(inputHeight, {
      duration: 120,
    });
  }, [inputHeight]);

  /*
  |--------------------------------------------------------------------------
  | Container
  |--------------------------------------------------------------------------
  */

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value + 16,
      
      borderRadius: interpolate(
        progress.value,
        [0, 1],
        [
          COLLAPSED_RADIUS,
          EXPANDED_RADIUS,
        ]
      ),

      paddingBottom: interpolate(
        progress.value,
        [0, 1],
        [8, 8]
      ),
    };
  });

  /*
  |--------------------------------------------------------------------------
  | Toolbar
  |--------------------------------------------------------------------------
  */

  const toolbarStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(
        progress.value,
        [0, 1],
        [6, 6]
      ),

      transform: [{
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, 4]
        ),
      },
      ],
    };
  });

  /*
  |--------------------------------------------------------------------------
  | Send Button
  |--------------------------------------------------------------------------
  */

  const sendButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, 1]
        ),
      },
      ],
    };
  });

  return {
    progress,

    containerStyle,

    toolbarStyle,

    sendButtonStyle,
  };
}