import * as ImagePicker from "expo-image-picker";

import { Attachment } from "../types/attachment";

export async function takePhoto(): Promise<Attachment | null> {
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    console.log("Camera permission denied.");
    return null;
  }

  const result =
    await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

  if (result.canceled || !result.assets.length) {
    return null;
  }

  const asset = result.assets[0];

  return {
    id: `${Date.now()}-${Math.random()}`,
    type: "camera",
    uri: asset.uri,
    name: asset.fileName ?? undefined,
    mimeType: asset.mimeType ?? undefined,
    size: asset.fileSize ?? undefined,
  };
}