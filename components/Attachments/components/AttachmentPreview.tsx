import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { X } from "lucide-react-native";

import { useTheme } from "../../../theme/useTheme";

import { Attachment } from "../types/attachment";

interface Props {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}

export default function AttachmentPreview({
  attachments,
  onRemove,
}: Props) {
  const { colors } = useTheme();

  if (attachments.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {attachments.map((attachment) => {
        const isImage =
          attachment.type === "image" ||
          attachment.type === "camera";

        return (
          <View
            key={attachment.id}
            style={styles.item}
          >
            {isImage ? (
              <Image
                source={{ uri: attachment.uri }}
                style={styles.image}
              />
            ) : (
              <View
                style={[
                  styles.filePreview,
                  {
                    backgroundColor:
                      colors.primarySoft ??
                      colors.surface,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fileText,
                    { color: colors.text },
                  ]}
                  numberOfLines={2}
                >
                  {attachment.name ??
                    attachment.type}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.removeButton,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
              onPress={() =>
                onRemove(attachment.id)
              }
              activeOpacity={0.8}
            >
              <X
                size={14}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    
    alignItems: "flex-start",
    
  //  borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    marginBottom: 6,
  },


  
  item: {
  position: "relative",
  width: 63,
  height: 63,
  marginRight: 8,
  marginBottom: 4,
},

  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },

  filePreview: {
    width: 100,
    minHeight: 64,
    borderRadius: 12,
    padding: 8,
    justifyContent: "center",
  },

  fileText: {
    fontSize: 12,
    fontWeight: "500",
  },

  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});