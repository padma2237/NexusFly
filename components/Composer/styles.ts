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
  INPUT_LEFT_GAP,
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

composerContent: {
  width: "100%",
  
  
},

collapsedLayout: {
  flexDirection: "row",
  alignItems: "center",
},

expandedLayout: {
  flexDirection: "column",
},

inputContainer: {
  justifyContent: "center",
},

inputContainerCollapsed: {
  flex: 1,
  marginLeft: INPUT_LEFT_GAP,
},

inputContainerExpanded: {
  width: "100%",
},


input: {
  width: "100%",
  minHeight: MIN_INPUT_HEIGHT,
  fontSize: INPUT_FONT_SIZE,
  lineHeight: INPUT_LINE_HEIGHT,
  margin: 0,
  paddingHorizontal: 0,
  
  includeFontPadding: false,
  
},

  leftActions: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  
},

rightActions: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: ACTION_GAP,
},

iconButton: {
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: BUTTON_RADIUS,
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  margin: 0,
},

iconContent: {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
},
  singleLineRow: {
  flexDirection: "row",
  alignItems: "center",
},


  
toolbar: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  minHeight: 36,
  marginTop: TOOLBAR_MARGIN_TOP,
  paddingBottom: 6,
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
