import * as ImagePicker from "expo-image-picker";

import { Attachment } from "../types/attachment";

export async function pickPhoto(): Promise<Attachment | null> {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    console.log("Photo library permission denied.");
    return null;
  }

  const result =
    await ImagePicker.launchImageLibraryAsync({
     // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

  if (result.canceled || !result.assets.length) {
    return null;
  }

  const asset = result.assets[0];

  return {
    id: `${Date.now()}-${Math.random()}`,
    type: "image",
    uri: asset.uri,
    name: asset.fileName ?? undefined,
    mimeType: asset.mimeType ?? undefined,
    size: asset.fileSize ?? undefined,
  };
}