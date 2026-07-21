import React, {
  useRef,
  useState
} from "react";
import {
  View
} from "react-native";
import {
  BottomSheetModal
} from "@gorhom/bottom-sheet";

import AttachmentSheet from "../AttachmentSheet";
import {
  pickImage
} from "../../services/imagePicker";
import {
  useTheme
} from "../../theme/useTheme";
import stylesFactory from "./styles";
import ComposerInput from "./ComposerInput";
import ImagePreviewBar from "./ImagePreviewBar";
import ImageViewerModal from "./ImageViewerModal";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isLoading: boolean;
  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

export default function ChatComposer({
  value,
  onChangeText,
  onSend,
  isLoading,
  webSearchEnabled,
  onToggleWebSearch,
}: Props) {


  const {
    colors
  } = useTheme();
  const styles = stylesFactory(colors);

  const attachmentSheetRef = useRef < BottomSheetModal > (null);


  const [selectedImage,
    setSelectedImage] = useState < any > (null);
  const [viewerVisible,
    setViewerVisible] = useState(false);

  return (
    <>
          
          <View
  style={[
    styles.container,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
  ]}
>

        {selectedImage && (
          <View style={styles.previewContainer}>
            <ImagePreviewBar
              image={selectedImage}
              onRemove={() => setSelectedImage(null)}
              onPress={() => setViewerVisible(true)}
              />
          </View>
        )}

        <ComposerInput
          value={value}
          onChangeText={onChangeText}
          hasText={value.trim().length > 0}
          isLoading={isLoading}
          onSend={onSend}
          onAttachmentPress={() =>
          attachmentSheetRef.current?.present()
          }
          webSearchEnabled={webSearchEnabled}
          onToggleWebSearch={onToggleWebSearch}
          />

      </View>

      <ImageViewerModal
        visible={viewerVisible}
        image={selectedImage}
        onClose={() => setViewerVisible(false)}
        />

      <AttachmentSheet
        ref={attachmentSheetRef}
        onCamera={() => {
          attachmentSheetRef.current?.dismiss();
        }}
        onGallery={async () => {
          attachmentSheetRef.current?.dismiss();

          const image = await pickImage();

          if (image) {
            setSelectedImage(image);
          }
        }}
        onFile={() => {
          attachmentSheetRef.current?.dismiss();
        }}
        onClipboard={() => {
          attachmentSheetRef.current?.dismiss();
        }}
        />
    </>
  );
}