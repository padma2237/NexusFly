import { Message } from "../types/chat";
import { ApiResponse } from "./search/types";

const API_URL = "https://nexusfly-backend.onrender.com/ask";

export async function sendMessage(
  messages: Message[],
  webSearch: boolean
): Promise<ApiResponse> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webSearch,
        contents: messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      }),
    });

 const text = await response.text();
  

    if (!response.ok) {
      return {
  answer: `Server Error (${response.status})`,
  sources: [],
};
    }

    
    const data: ApiResponse = JSON.parse(text);

return data;
    
    
    
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
  answer: "❌ Unable to connect to NexusFly.",
  sources: [],
};}
}