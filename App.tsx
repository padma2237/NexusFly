import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { ConversationProvider } from "./context/ConversationContext";

export default function App() {
  return (
      <ConversationProvider>
            <NavigationContainer>
                    <DrawerNavigator />
                          </NavigationContainer>
                              </ConversationProvider>
                                );
                                }