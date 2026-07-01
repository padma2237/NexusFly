import Header from "./components/Header";
import { sendMessage } from "./services/api";
import { Message } from "./types/chat";
import Colors from "./constants/colors";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import useChat from "./hooks/useChat";


import React, { useState, useRef } from 'react';


import {
    StyleSheet,
      FlatList,
        KeyboardAvoidingView,
          Platform,
          } from 'react-native';

          import {
            SafeAreaProvider,
              SafeAreaView,
              } from 'react-native-safe-area-context';



import { StatusBar } from 'expo-status-bar';

type MessageItem = Message;
export default function App() {
// 2. Add types to your state hooks

const { messages, setMessages } = useChat();


const [inputText, setInputText] = useState<string>('');
const [isLoading, setIsLoading] = useState<boolean>(false);

// 3. Add type to your useRef hook
const flatListRef = useRef<FlatList<MessageItem>>(null);

const handleSend = async () => {
if (!inputText.trim() || isLoading) return;

const userMessage: MessageItem = {  
  id: Date.now().toString(),  
  role: 'user',  
  text: inputText,  
  createdAt: Date.now(),
};  


const updatedMessages = [...messages, userMessage];

setMessages(updatedMessages);

setInputText("");
setIsLoading(true);

try {
  const aiText = await sendMessage(updatedMessages);


  setMessages((prev) => [  
    ...prev,  
    { id: Date.now().toString(), 
    role: 'assistant', 
    text: aiText,
    createdAt: Date.now(),
    },  
  ]);  
} catch (error) {  
  setMessages((prev) => [  
    ...prev,  
    {  
      id: Date.now().toString(),  
      role: 'assistant',  
      text: 'Error connecting to AI.', 
      createdAt: Date.now(),
    },  
  ]);  
} finally {  
  setIsLoading(false);  
}
};

const renderMessage = ({ item }: { item: MessageItem }) => (
  <ChatBubble message={item} />
);

return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>

<StatusBar style="light" />

<Header title="NexusFly" />


  <KeyboardAvoidingView  
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}  
    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}  
    style={styles.chatWrapper}>  
    <FlatList  
      ref={flatListRef}  
      data={messages}  
      renderItem={renderMessage}  
      keyExtractor={(item) => item.id}  
      contentContainerStyle={styles.chatScroll}  
      onContentSizeChange={() =>  
        setTimeout(  
          () => flatListRef.current?.scrollToEnd({ animated: true }),  
          100  
        )  
      }  
    />  

    <ChatInput
  value={inputText}
  onChangeText={setInputText}
  onSend={handleSend}
  isLoading={isLoading}
/>

  </KeyboardAvoidingView>  
</SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  chatWrapper: {
    flex: 1,
  },

  chatScroll: {
    padding: 20,
  },
});