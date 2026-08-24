export type AttachmentType =
  | "image"
  | "camera"
  | "file"
  | "clipboard";

export interface Attachment {
  id: string;
  type: AttachmentType;

  uri: string;

  name?: string;
  mimeType?: string;
  size?: number;
}