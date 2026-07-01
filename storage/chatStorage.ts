import AsyncStorage from "@react-native-async-storage/async-storage";
import { Message } from "../types/chat";

const CHAT_KEY = "nexusfly_chat_history";

export const saveChats = async (messages: Message[]) => {
  try {
    await AsyncStorage.setItem(
      CHAT_KEY,
      JSON.stringify(messages)
    );
  } catch (e) {
    console.log("Save Error", e);
  }
};

export const loadChats = async (): Promise<Message[]> => {
  try {
    const data = await AsyncStorage.getItem(CHAT_KEY);

    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Load Error", e);
    return [];
  }
};

export const clearChats = async () => {
  await AsyncStorage.removeItem(CHAT_KEY);
};