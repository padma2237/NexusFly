import { File } from "expo-file-system";

export async function audioFileToBase64(
  uri: string
): Promise<string> {
  const file = new File(uri);

  return file.base64();
}