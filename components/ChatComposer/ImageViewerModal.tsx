import React from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { X } from "lucide-react-native";

interface Props {
  visible: boolean;
  image: any;
  onClose: () => void;
}

export default function ImageViewerModal({
  visible,
  image,
  onClose,
}: Props) {
  if (!image) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.close}
          onPress={onClose}
        >
          <X color="#fff" size={28} />
        </TouchableOpacity>

        <Image
          source={{ uri: image.uri }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.96)",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "80%",
  },

  close: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 100,
  },
});