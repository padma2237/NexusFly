import { StyleSheet } from "react-native";
import {
  BUTTON_SIZE,
  BUTTON_RADIUS,
  COLLAPSED_RADIUS,
  COMPOSER_MIN_HEIGHT,
  MIN_INPUT_HEIGHT,
  INPUT_FONT_SIZE,
  INPUT_LINE_HEIGHT,
} from "./config/constants";
import {
  CONTAINER_PADDING_HORIZONTAL,
  CONTAINER_PADDING_VERTICAL,
  ACTION_GAP,
  INPUT_PADDING_TOP,
  INPUT_PADDING_BOTTOM,
  TOOLBAR_MARGIN_TOP,
} from "./config/measurements";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: COLLAPSED_RADIUS,
    minHeight: COMPOSER_MIN_HEIGHT,
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: CONTAINER_PADDING_VERTICAL,
    justifyContent: "center",
  },

  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  inputContainer: {
    flex: 1,
    marginHorizontal: ACTION_GAP,
    justifyContent: "center",
  },

  input: {
    width: "100%",
    minHeight: MIN_INPUT_HEIGHT,
    fontSize: INPUT_FONT_SIZE,
    lineHeight: INPUT_LINE_HEIGHT,
    margin: 0,
    paddingHorizontal: 0,
    paddingTop: INPUT_PADDING_TOP,
    paddingBottom: INPUT_PADDING_BOTTOM,
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: ACTION_GAP,
  },

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: ACTION_GAP,
  },

  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: TOOLBAR_MARGIN_TOP,
  },

  iconButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },

  sendButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
});

export default styles;
