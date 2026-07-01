import { useEffect, useState } from "react";
import { Message } from "../types/chat";
import { loadChats, saveChats } from "../storage/chatStorage";

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      const history = await loadChats();

      if (history.length > 0) {
        setMessages(history);
      } else {
        setMessages([
          {
            id: "1",
            role: "assistant",
            text: "Hello! I am NexusFly. How can I help you today?",
            createdAt: Date.now(),
          },
        ]);
      }
    })();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      saveChats(messages);
    }
  }, [messages]);

  return {
    messages,
    setMessages,
  };
}