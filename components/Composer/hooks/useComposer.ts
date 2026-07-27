import useComposerState from "./useComposerState";
import useComposerLayout from "./useComposerLayout";
import useComposerAnimation from "./useComposerAnimation";

export default function useComposer() {
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const stateController = useComposerState();

  /*
  |--------------------------------------------------------------------------
  | Layout
  |--------------------------------------------------------------------------
  */

  const layout = useComposerLayout({
    inputHeight: stateController.state.inputHeight,
    isExpanded: stateController.state.isExpanded,
  });

  /*
  |--------------------------------------------------------------------------
  | Animation
  |--------------------------------------------------------------------------
  */

  const animation = useComposerAnimation({
    isExpanded: stateController.state.isExpanded,
    inputHeight: stateController.state.inputHeight,
  });

  /*
  |--------------------------------------------------------------------------
  | Public API
  |--------------------------------------------------------------------------
  */

  return {
    state: stateController.state,

    actions: stateController.actions,

    layout,

    animation,
  };
}