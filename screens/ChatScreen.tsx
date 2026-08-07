
import React, {
useRef,
useState,
useEffect,
useCallback,
} from "react";
import {
FlatList,
KeyboardAvoidingView,
Platform,
StyleSheet,
Keyboard,
View,
TouchableWithoutFeedback,
} from "react-native";

import {
SafeAreaView
} from "react-native-safe-area-context";
import {
StatusBar
} from "expo-status-bar";

import Header from "../components/Header";

import Composer from "../components/Composer";

import {
useTheme
} from "../theme/useTheme";

import {
sendMessage
} from "../services/api";

import {
Message
} from "../types/chat";
import {
useConversation
} from "../context/ConversationContext";

import {
useNavigation,
DrawerActions
} from "@react-navigation/native";

import MessageItem from "../components/Chat/MessageItem";

import ChatList from "../components/Chat/ChatList";

import { Dimensions } from "react-native";

export default function ChatScreen() {

const WINDOW_HEIGHT =
Dimensions.get("window").height;

const USER_ANCHOR =
WINDOW_HEIGHT * 0.20;

const {
currentConversation,
currentConversationId,
createNewConversation,
setConversations,
} = useConversation();

const navigation = useNavigation();

const {
colors,
themeName,
setTheme
} = useTheme();

const styles = React.useMemo(
() => createStyles(colors),
[colors]
);

const messages = currentConversation?.messages ?? [];

const flatListRef = useRef < FlatList < Message>>(null);

const messageLayouts = useRef<
Record<string, { y: number; height: number }>

> ({});



const contentHeight = useRef(0);

const isUserNearBottom = useRef(true);

const handleMessageLayout = useCallback(
(
id: string,
y: number,
height: number
) => {
messageLayouts.current[id] = {
y,
height,
};
},
[]
);

const [listHeight,
setListHeight] = useState(0);

const [webSearchEnabled,
setWebSearchEnabled] = useState(false);

const [inputText,
setInputText] = useState("");
const [isLoading,
setIsLoading] = useState(false);

const scrollToLatest = () => {
setTimeout(() => {
const offset = Math.max(
0,
contentHeight.current - listHeight + 32
);

flatListRef.current?.scrollToOffset({  
    offset,  
    animated: true,  
  });  
}, 100);

};

const anchorUserMessage = (
messageId: string
) => {
requestAnimationFrame(() => {
const layout =
messageLayouts.current[messageId];

if (!layout) return;  

flatListRef.current?.scrollToOffset({  
  offset: Math.max(  
    0,  
    layout.y - USER_ANCHOR  
  ),  
  animated: true,  
});

});
};

const scrollAssistantToTop = (index: number) => {
requestAnimationFrame(() => {
flatListRef.current?.scrollToIndex({
index,
animated: true,
viewPosition: 0,
});
});
};

useEffect(() => {
setInputText("");
}, [currentConversationId]);

const handleSend = async () => {
if (!inputText.trim() || isLoading)

return;  

let activeConversation = currentConversation;  

if (!activeConversation) {  
  activeConversation = createNewConversation();  
}  

const userMessage: Message = {  
  id: Date.now().toString(),  
  role: "user",  
  text: inputText,  
  createdAt: Date.now(),  
};  

const updatedMessages = [...messages,  
  userMessage];  
const newTitle =  
activeConversation.title === "New Chat"  
? inputText.slice(0, 30): activeConversation.title;  

setConversations((prev) =>  
  prev.map((chat) =>  
    chat.id === activeConversation.id  
    ? {  
      ...chat,  
      title: newTitle,  
      messages: updatedMessages,  
      updatedAt: Date.now(),  
    }: chat  
  )  
);  
  
  
requestAnimationFrame(() => {

anchorUserMessage(userMessage.id);
});

setInputText("");  
Keyboard.dismiss();  
setIsLoading(true);  

try {  
  const result = await sendMessage(updatedMessages, webSearchEnabled);  

  const assistantMessage: Message = {  
    id: Date.now().toString(),  
    role: "assistant",  
    text: result.answer,  
    sources: result.sources,  
    createdAt: Date.now(),  
  };  

  setConversations((prev) =>  
    prev.map((chat) =>  
      chat.id === activeConversation.id  
      ? {  
        ...chat,  
        messages: [...chat.messages, assistantMessage],  
        updatedAt: Date.now(),  
      }: chat  
    )  
  );

}

catch (error) {  
  console.error(error);  
  const errorMessage: Message = {  
    id: Date.now().toString(),  
    role: "assistant",  
    text: "Error connecting to AI.",  
    createdAt: Date.now(),  
  };  

  setConversations((prev) =>  
    prev.map((chat) =>  
      chat.id === activeConversation.id  
      ? {  
        ...chat,  
        messages: [...chat.messages, errorMessage],  
        updatedAt: Date.now(),  
      }: chat  
    )  
  );  
} finally {  
  setIsLoading(false);  
}

};

const handleRegenerate = useCallback (async () => {
if (messages.length < 2 || isLoading) return;

// Find the last user message  
const lastUserIndex = [...messages]  
.reverse()  
.findIndex((m) => m.role === "user");  

if (lastUserIndex === -1) return;  

const userIndex = messages.length - 1 - lastUserIndex;  

const updatedMessages = messages.slice(0, userIndex + 1);  

setConversations((prev) =>  
  prev.map((chat) =>  
    chat.id === currentConversationId  
    ? {  
      ...chat,  
      messages: updatedMessages,  
      updatedAt: Date.now(),  
    }: chat  
  )  
);  

setIsLoading(true);  

try {  
  const result = await sendMessage(  
    updatedMessages,  
    webSearchEnabled  
  );  

  const assistantMessage: Message = {  
    id: Date.now().toString(),  
    role: "assistant",  
    text: result.answer,  
    sources: result.sources,  
    createdAt: Date.now(),  
  };  

  setConversations((prev) =>  
    prev.map((chat) =>  
      chat.id === currentConversationId  
      ? {  
        ...chat,  
        messages: [...updatedMessages, assistantMessage],  
        updatedAt: Date.now(),  
      }: chat  
    )  
  );  
    
    
    
} finally {  
  setIsLoading(false);  
}

},
[messages,
currentConversationId,
webSearchEnabled,
isLoading]);




const renderItem = useCallback(
  () => <View />,
  []
);

    
return (
  
  
  
  
  
  
  
  <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
    <StatusBar style="light" />
    <Header
      title="NexusFly"
      onMenuPress={() =>
        navigation.dispatch(DrawerActions.openDrawer())
      }
      onNewChatPress={() => {
        createNewConversation();
        Keyboard.dismiss();

        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }}
      onSettingsPress={() =>
        navigation.navigate("Settings" as never)
      }
    />
    
   

<TouchableWithoutFeedback
  onPress={Keyboard.dismiss}
  accessible={false}
>
  <View style={{ flex: 1 }}>

    <ChatList
      flatListRef={flatListRef}
      messages={messages}
      isLoading={isLoading}
      
      
renderItem={({ item, index }) => (
  <MessageItem
    message={item}
    onRegenerate={
      index === messages.length - 1 &&
      item.role === "assistant"
        ? handleRegenerate
        : undefined
    }
  />
)}

      contentHeight={contentHeight}
      isUserNearBottom={isUserNearBottom}
      scrollToLatest={scrollToLatest}
      setInputText={setInputText}
      
      
      onMessageLayout={handleMessageLayout}
    />
    
    <Composer
    value={inputText}
    onChangeText={setInputText}
    onSend={handleSend}
    isLoading={isLoading}
    webSearchEnabled={webSearchEnabled}
    onToggleWebSearch={() =>
      setWebSearchEnabled(!webSearchEnabled)
    }
  />

  </View>
</TouchableWithoutFeedback>


  </SafeAreaView>
);


}

const createStyles = (colors: any) =>

StyleSheet.create({
container: {
flex: 1,
backgroundColor: colors.background,
},

chatWrapper: {  
  flex: 1,  
},

}
);
