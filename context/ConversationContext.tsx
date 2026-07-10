import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  Conversation
} from "../types/conversation";

import {
  loadChats,
  saveChats
} from "../storage/chatStorage";

interface ConversationContextType {
  conversations: Conversation[];
  setConversations: React.Dispatch < React.SetStateAction < Conversation[]>>;

  currentConversation: Conversation | null;
  currentConversationId: string | null;
  
isLoading: boolean;

  setCurrentConversationId: React.Dispatch <
  React.SetStateAction < string | null > >;

  createNewConversation: () => Conversation;
  deleteConversation: (id: string) => void;

  renameConversation: (id: string, title: string) => void;
}

const ConversationContext =
createContext < ConversationContextType | null > (null);

export function ConversationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations,
    setConversations] = useState < Conversation[] > ([]);

  const [currentConversationId,
    setCurrentConversationId] =
  useState < string | null > (null);
  
  const [isLoading, setIsLoading] = useState(true);
  

  const currentConversation =
  conversations.find(
    (chat) => chat.id === currentConversationId
  ) ?? null;

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    return newConversation;
  };

  const deleteConversation = (id: string) => {
    const updated = conversations.filter((chat) => chat.id !== id);

    setConversations(updated);

    if (currentConversationId === id) {
      if (updated.length > 0) {
        setCurrentConversationId(updated[0].id);
      } else {
        setCurrentConversationId(null);
      }
    }
  };


  const renameConversation = (id: string, title: string) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === id
        ? {
          ...chat,
          title,
          updatedAt: Date.now(),
        }: chat
      )
    );
  };


  useEffect(() => {
    (async () => {
      const savedChats = await loadChats();

      setConversations(savedChats);

      if (savedChats.length > 0) {
  setCurrentConversationId(null);
} else {
  const newConversation: Conversation = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  setConversations([newConversation]);
  setCurrentConversationId(newConversation.id);
}
setIsLoading(false);
    })();
  }, []);


  useEffect(() => {

    saveChats(conversations);

  }, [conversations]);



  return (
    <ConversationContext.Provider
      value={ {
        conversations,
        setConversations,
        currentConversation,
        currentConversationId,
        setCurrentConversationId,
        createNewConversation,
        deleteConversation,
        renameConversation,
        isLoading,

      }}
      >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      "useConversation must be used inside ConversationProvider"
    );
  }

  return context;
}