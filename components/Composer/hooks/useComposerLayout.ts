import { useMemo } from "react";

import {
  COLLAPSED_RADIUS,
  EXPANDED_RADIUS,
  MAX_INPUT_HEIGHT,
} from "../config/constants";

interface Params {
  inputHeight: number;
  isExpanded: boolean;
}

export default function useComposerLayout({
  inputHeight,
  isExpanded,
}: Params) {
  const radius = useMemo(
    () =>
      isExpanded
        ? EXPANDED_RADIUS
        : COLLAPSED_RADIUS,
    [isExpanded]
  );

  

  return {
    radius,
    
    inputHeight,
  };
}