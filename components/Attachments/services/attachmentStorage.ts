import * as FileSystem from "expo-file-system/legacy";

const ATTACHMENTS_DIR =
  `${FileSystem.documentDirectory}attachments/`;

export async function saveAttachment(
  uri: string,
  id: string,
  extension: string = "jpg"
): Promise<string> {
  try {
    const dirInfo =
      await FileSystem.getInfoAsync(
        ATTACHMENTS_DIR
      );

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        ATTACHMENTS_DIR,
        {
          intermediates: true,
        }
      );
    }

    const destination =
      `${ATTACHMENTS_DIR}${id}.${extension}`;

    await FileSystem.copyAsync({
      from: uri,
      to: destination,
    });

    return destination;
  } catch (error) {
    console.error(
      "Failed to save attachment:",
      error
    );

    throw error;
  }
}

export async function deleteAttachment(
  uri: string
): Promise<void> {
  try {
    const info =
      await FileSystem.getInfoAsync(uri);

    if (info.exists) {
      await FileSystem.deleteAsync(uri);
    }
  } catch (error) {
    console.error(
      "Failed to delete attachment:",
      error
    );
  }
}