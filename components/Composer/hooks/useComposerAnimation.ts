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
  COMPOSER_MIN_HEIGHT,
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
    minHeight: COMPOSER_MIN_HEIGHT,

    borderRadius: interpolate(
      progress.value,
      [0, 1],
      [
        COLLAPSED_RADIUS,
        EXPANDED_RADIUS,
      ]
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
    marginTop: 6,
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