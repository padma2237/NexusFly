
import { SearchResult } from "../services/search/types";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
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