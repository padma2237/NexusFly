import * as DocumentPicker from "expo-document-picker";

import { Attachment } from "../types/attachment";

export async function pickFile(): Promise<Attachment | null> {
  const result =
    await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

  if (result.canceled || !result.assets.length) {
    return null;
  }

  const asset = result.assets[0];

  return {
    id: `${Date.now()}-${Math.random()}`,
    type: "file",
    uri: asset.uri,
    name: asset.name,
    mimeType: asset.mimeType ?? undefined,
    size: asset.size ?? undefined,
  };
}