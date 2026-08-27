import { useState, useCallback } from "react";

import { Attachment } from "../types/attachment";

import { pickPhoto } from "../services/photoService";
import { takePhoto } from "../services/cameraService";
import { pickFile } from "../services/fileService";
import {
  getClipboardAttachment,
} from "../services/clipboardService";

import {
  saveAttachment,
  deleteAttachment,
} from "../services/attachmentStorage";

function getExtension(attachment: Attachment): string {
  if (attachment.name) {
    const parts = attachment.name.split(".");
    if (parts.length > 1) {
      return parts[parts.length - 1].toLowerCase();
    }
  }

  if (attachment.mimeType) {
    const subtype = attachment.mimeType.split("/")[1];

    if (subtype) {
      return subtype.split(";")[0].toLowerCase();
    }
  }

  if (
    attachment.type === "image" ||
    attachment.type === "camera"
  ) {
    return "jpg";
  }

  return "bin";
}

export default function useAttachments() {
  const [attachments, setAttachments] =
    useState<Attachment[]>([]);

  const addAttachment = useCallback(
    async (attachment: Attachment | null) => {
      if (!attachment) {
        return;
      }

      try {
        const extension =
          getExtension(attachment);

        const permanentUri =
          await saveAttachment(
            attachment.uri,
            attachment.id,
            extension
          );

        const permanentAttachment: Attachment = {
          ...attachment,
          uri: permanentUri,
        };

        setAttachments((current) => [
          ...current,
          permanentAttachment,
        ]);
      } catch (error) {
        console.error(
          "Failed to persist attachment:",
          attachment.name,
          error
        );
      }
    },
    []
  );

  const selectPhoto = useCallback(async () => {
    const attachment = await pickPhoto();

    await addAttachment(attachment);
  }, [addAttachment]);

  const capturePhoto = useCallback(async () => {
    const attachment = await takePhoto();

    await addAttachment(attachment);
  }, [addAttachment]);

  const selectFile = useCallback(async () => {
    const attachment = await pickFile();

    await addAttachment(attachment);
  }, [addAttachment]);

  const addClipboard = useCallback(async () => {
    const attachment =
      await getClipboardAttachment();

    await addAttachment(attachment);
  }, [addAttachment]);

  const removeAttachment = useCallback(
    async (id: string) => {
      const attachment =
        attachments.find(
          (item) => item.id === id
        );

      if (attachment) {
        await deleteAttachment(
          attachment.uri
        );
      }

      setAttachments((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );
    },
    [attachments]
  );

  const clearAttachments = useCallback(() => {
    setAttachments([]);
  }, []);

  return {
    attachments,
    selectPhoto,
    capturePhoto,
    selectFile,
    addClipboard,
    removeAttachment,
    clearAttachments,
  };
}