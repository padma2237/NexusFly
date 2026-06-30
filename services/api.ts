import { Message } from "../types/chat";

const API_URL = "https://nexusfly-backend.onrender.com/ask";

export async function sendMessage(messages: Message[]): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      }),
    });

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received."
    );
  } catch (error) {
    console.error(error);
    return "❌ Unable to connect to NexusFly.";
  }
}