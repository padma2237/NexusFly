import { SearchResult } from "../services/search/types";
import { Attachment } from "../components/Attachments/types/attachment";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;

  attachments?: Attachment[];

  sources?: SearchResult[];
  createdAt: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}

export interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
}