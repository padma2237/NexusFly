import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Conversation
} from "../types/conversation";

const CHAT_KEY = "nexusfly_conversations";

export const saveChats = async (
  conversations: Conversation[]
) => {
  try {
    await AsyncStorage.setItem(
      CHAT_KEY,
      JSON.stringify(conversations)
    );
  } catch (e) {
    console.log("Save Error", e);
  }
};

export const loadChats = async (): Promise < Conversation[] > => {
  try {
    const data = await AsyncStorage.getItem(CHAT_KEY);

    return data ? JSON.parse(data): [];
  } catch (e) {
    console.log("Load Error", e);
    return [];
  }
};

export const clearChats = async () => {
  try {
    await AsyncStorage.removeItem(CHAT_KEY);
  } catch (e) {
    console.log("Clear Error", e);
  }
};