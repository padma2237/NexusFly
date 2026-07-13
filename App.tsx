import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import {
  ConversationProvider,
  useConversation,
} from "./context/ConversationContext";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ConversationProvider>
          <AppContent />
        </ConversationProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}