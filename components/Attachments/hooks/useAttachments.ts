import { useState, useCallback } from "react";

import { Attachment } from "../types/attachment";

import { pickPhoto } from "../services/photoService";
import { takePhoto } from "../services/cameraService";
import { pickFile } from "../services/fileService";
import {
  getClipboardAttachment,
} from "../services/clipboardService";

export default function useAttachments() {
  const [attachments, setAttachments] =
    useState<Attachment[]>([]);

  const addAttachment = useCallback(
    (attachment: Attachment | null) => {
      if (!attachment) {
        return;
      }

      setAttachments((current) => [
        ...current,
        attachment,
      ]);
    },
    []
  );

  const selectPhoto = useCallback(async () => {
    const attachment = await pickPhoto();

    addAttachment(attachment);
  }, [addAttachment]);

  const capturePhoto = useCallback(async () => {
    const attachment = await takePhoto();

    addAttachment(attachment);
  }, [addAttachment]);

  const selectFile = useCallback(async () => {
    const attachment = await pickFile();

    addAttachment(attachment);
  }, [addAttachment]);

  const addClipboard = useCallback(async () => {
    const attachment =
      await getClipboardAttachment();

    addAttachment(attachment);
  }, [addAttachment]);

  const removeAttachment = useCallback(
    (id: string) => {
      setAttachments((current) =>
        current.filter(
          (attachment) =>
            attachment.id !== id
        )
      );
    },
    []
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