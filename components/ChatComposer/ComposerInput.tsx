import React, {
  useState
} from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";

import {
  useTheme
} from "../../theme/useTheme";


import ComposerFooter from "./ComposerFooter";
import ComposerActions from "./ComposerActions";
import ComposerSendButton from "./ComposerSendButton";

interface Props {
  value: string;
  onChangeText: (text: string) => void;

  hasText: boolean;
  isLoading: boolean;

  onSend: () => void;
  onAttachmentPress: () => void;

  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

export default function ComposerInput({
  value,
  onChangeText,
  hasText,
  isLoading,
  onSend,
  onAttachmentPress,
  webSearchEnabled,
  onToggleWebSearch,
}: Props) {

  const {
    colors
  } = useTheme();

  const MIN_HEIGHT = 24;
  const MAX_HEIGHT = 140;

  const [inputHeight,
    setInputHeight] = useState(MIN_HEIGHT);
    
const isSingleLine = inputHeight <= MIN_HEIGHT + 2;

    const [isMultiline, setIsMultiline] = useState(false);

const handleContentSizeChange = (
  e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
) => {
  const height = e.nativeEvent.contentSize.height;

  const newHeight = Math.min(
    MAX_HEIGHT,
    Math.max(MIN_HEIGHT, height)
  );

  setInputHeight(newHeight);

  setIsMultiline(newHeight > 30);
};


  return (
    
   <>
  {isMultiline ? (
    <View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Message NexusFly..."
        placeholderTextColor={colors.subText}
        multiline
        underlineColorAndroid="transparent"
        onContentSizeChange={handleContentSizeChange}
        scrollEnabled={inputHeight >= MAX_HEIGHT}
        style={[
          styles.input,
          {
            color: colors.text,
            height: inputHeight,
          },
        ]}
      />

      <ComposerFooter
        hasText={hasText}
        isLoading={isLoading}
        onSend={onSend}
        onAttachmentPress={onAttachmentPress}
        webSearchEnabled={webSearchEnabled}
        onToggleWebSearch={onToggleWebSearch}
      />
    </View>
  ) : (
    
    
    <View style={styles.singleRow}>

  <ComposerActions
    onAttachmentPress={onAttachmentPress}
    webSearchEnabled={webSearchEnabled}
    onToggleWebSearch={onToggleWebSearch}
  />

  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder="Message NexusFly..."
    placeholderTextColor={colors.subText}
    multiline
    underlineColorAndroid="transparent"
    onContentSizeChange={handleContentSizeChange}
    scrollEnabled={false}
    style={[
      styles.singleInput,
      {
        color: colors.text,
      },
    ]}
  />

  <ComposerSendButton
    hasText={hasText}
    isLoading={isLoading}
    onSend={onSend}
  />

</View>
    
    
   

  )}
</>
   
   
   
   
  );

}

  const styles = StyleSheet.create({
    
    singleRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 14,
  paddingVertical: 10,
},


inputContainer: {
  flex: 1,
},

multiContainer: {
  flexDirection: "column",
},
    
    input: {
      fontSize: 17,
      lineHeight: 24,

  color: "#000",
      padding: 0,
borderWidth: 0,
      marginHorizontal: 14,
      marginTop: 12,
      textAlignVertical: "top",

      includeFontPadding: false,
    },
    
    singleInput: {
  flex: 1,
  fontSize: 17,
  lineHeight: 24,
  padding: 0,
  marginLeft: 8,
  includeFontPadding: false,
},
  });