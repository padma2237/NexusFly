import React, { createContext, useContext, useState } from "react";
import { Conversation } from "../types/conversation";

interface ConversationContextType {
  conversations: Conversation[];
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
      currentConversation: Conversation | null;
        setCurrentConversation: React.Dispatch<
            React.SetStateAction<Conversation | null>
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
                        const [currentConversation, setCurrentConversation] =
                            useState<Conversation | null>(null);

                            const createNewConversation = () => {
                                const newConversation: Conversation = {
                                    id: Date.now().toString(),
                                        title: "New Chat",
                                            messages: [],
                                                createdAt: Date.now(),
                                                    updatedAt: Date.now(),
                                                      };

                                                        setConversations((prev) => [newConversation, ...prev]);
                                                          setCurrentConversation(newConversation);
                                                          };
                            
                              return (
                                  <ConversationContext.Provider
                                        value={{
                                                conversations,
                                                        setConversations,
                                                                currentConversation,
                                                                        setCurrentConversation,
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