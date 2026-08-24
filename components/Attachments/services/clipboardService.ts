import * as Clipboard from "expo-clipboard";

import { Attachment } from "../types/attachment";

export async function getClipboardAttachment(): Promise<Attachment | null> {
  const text = await Clipboard.getStringAsync();

  if (!text.trim()) {
    return null;
  }

  return {
    id: `${Date.now()}-${Math.random()}`,
    type: "clipboard",
    uri: text,
    mimeType: "text/plain",
  };
}