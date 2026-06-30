import React, { useState, useRef } from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
FlatList,
SafeAreaView,
KeyboardAvoidingView,
Platform,
ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Send, Settings, Menu, Mic } from 'lucide-react-native';

const API_URL = 'https://nexusfly-backend.onrender.com/ask';

// 1. Define types for your data structures
interface MessageItem {
id: string;
role: 'user' | 'assistant';
text: string;
}

export default function App() {
// 2. Add types to your state hooks
const [messages, setMessages] = useState<MessageItem[]>([
{
id: '1',
role: 'assistant',
text: 'Hello! I am NexusFly. Your New AI assistant. How can I help you today?',
},
]);
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
};  

setMessages((prev) => [...prev, userMessage]);  
const currentInput = inputText;  
setInputText('');  
setIsLoading(true);  

try {  
  const response = await fetch(API_URL, {  
    method: 'POST',  
    headers: { 'Content-Type': 'application/json' },  
    body: JSON.stringify({  
      contents: [{ role: 'user', parts: [{ text: currentInput }] }],  
    }),  
  });  

  if (!response.ok) throw new Error('Network response was not ok');  

  const data = await response.json();  

  // Fixed index syntax typo from the previous code snippet  
  const aiText: string =  
    data.candidates?.[0]?.content?.parts?.[0]?.text ||  
    'No response received.';  

  setMessages((prev) => [  
    ...prev,  
    { id: Date.now().toString(), role: 'assistant', text: aiText },  
  ]);  
} catch (error) {  
  setMessages((prev) => [  
    ...prev,  
    {  
      id: Date.now().toString(),  
      role: 'assistant',  
      text: 'Error connecting to AI.',  
    },  
  ]);  
} finally {  
  setIsLoading(false);  
}

};

// 4. Properly type the FlatList render function
const renderMessage = ({ item }: { item: MessageItem }) => (
<View
style={[
styles.messageBubble,
item.role === 'user' ? styles.userBubble : styles.assistantBubble,
]}>
<Text style={styles.messageText}>{item.text}</Text>
</View>
);

return (
<SafeAreaView style={styles.container}>
<StatusBar style="light" />

<View style={styles.header}>  
    <Menu color="#94a3b8" size={24} />  
    <Text style={styles.headerTitle}>NexusFly</Text>  
    <Settings color="#94a3b8" size={24} />  
  </View>  

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

    <View style={styles.inputContainer}>  
      <TouchableOpacity style={styles.iconButton}>  
        <Mic color="#a78bfa" size={22} />  
      </TouchableOpacity>  
      <TextInput  
        style={styles.input}  
        placeholder="Message Nexus..."  
        placeholderTextColor="#64748b"  
        value={inputText}  
        onChangeText={setInputText}  
      />  
      <TouchableOpacity  
        style={[  
          styles.sendButton,  
          isLoading && { backgroundColor: '#475569' },  
        ]}  
        onPress={handleSend}  
        disabled={isLoading}>  
        {isLoading ? (  
          <ActivityIndicator color="#fff" size="small" />  
        ) : (  
          <Send color="#ffffff" size={18} />  
        )}  
      </TouchableOpacity>  
    </View>  
  </KeyboardAvoidingView>  
</SafeAreaView>

);
}

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#020617' },
header: {
flexDirection: 'row',
justifyContent: 'space-between',
padding: 20,
borderBottomWidth: 1,
borderBottomColor: '#1e293b',
},
headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#f8fafc' },
chatWrapper: { flex: 1 },
chatScroll: { padding: 20 },
messageBubble: {
maxWidth: '85%',
padding: 14,
borderRadius: 20,
marginBottom: 16,
},
userBubble: {
backgroundColor: '#2563eb',
alignSelf: 'flex-end',
borderBottomRightRadius: 4,
},
assistantBubble: {
backgroundColor: '#0f172a',
alignSelf: 'flex-start',
borderBottomLeftRadius: 4,
borderWidth: 1,
borderColor: '#1e293b',
},
messageText: { color: '#f8fafc', fontSize: 16 },
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#0f172a',
margin: 16,
borderRadius: 28,
padding: 8,
borderWidth: 1,
borderColor: '#1e293b',
},
input: { flex: 1, color: '#f8fafc', paddingHorizontal: 12 },
iconButton: {
width: 42,
height: 42,
borderRadius: 21,
backgroundColor: '#1e293b',
justifyContent: 'center',
alignItems: 'center',
},
sendButton: {
width: 42,
height: 42,
borderRadius: 21,
backgroundColor: '#2563eb',
justifyContent: 'center',
alignItems: 'center',
marginLeft: 4,
},
});

