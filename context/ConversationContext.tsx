import React, {
    createContext,
      useContext,
        useState,
          useEffect,
          } from "react";
import { Conversation } from "../types/conversation";

interface ConversationContextType {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  
  currentConversation: Conversation | null;
  currentConversationId: string | null;

  setCurrentConversationId: React.Dispatch<
    React.SetStateAction<string | null>
    >;


  createNewConversation: () => void;
}


const ConversationContext =
  createContext<ConversationContextType | null>(null);

export function ConversationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
const [currentConversationId, setCurrentConversationId] =
  useState<string | null>(null);





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
  };
  useEffect(() => {
      if (conversations.length === 0) {
          createNewConversation();
            }
            }, [conversations]);
  

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        setConversations,
        currentConversation,
        currentConversationId,
        setCurrentConversationId,
        createNewConversation,

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