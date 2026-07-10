import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import {
  ConversationProvider,
  useConversation,
} from "./context/ConversationContext";

function AppContent() {
  const { isLoading } = useConversation();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ConversationProvider>
      <AppContent />
    </ConversationProvider>
  );
}