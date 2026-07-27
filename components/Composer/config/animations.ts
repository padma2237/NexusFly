/*
|--------------------------------------------------------------------------
| Composer Animations
|--------------------------------------------------------------------------
|
| Single source of truth for all composer animations.
|
*/

import { Easing } from "react-native-reanimated";

//
// Durations
//

export const DURATION_FAST = 160;
export const DURATION_NORMAL = 220;
export const DURATION_SLOW = 320;

//
// Easings
//

export const EASE_OUT = Easing.out(Easing.cubic);

export const EASE_IN_OUT = Easing.inOut(Easing.cubic);

//
// Future Spring Config
//

export const SPRING_CONFIG = {
  damping: 18,
  stiffness: 180,
  mass: 0.9,
};

//
// Future Delays
//

export const TOOLBAR_DELAY = 0;