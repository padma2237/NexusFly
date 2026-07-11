import { Message } from "../types/chat";

const API_URL = "https://nexusfly-backend.onrender.com/ask";

export async function sendMessage(
  messages: Message[],
  webSearch: boolean
): Promise<string> {
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

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Response:", text);

    if (!response.ok) {
      return `Server Error (${response.status})`;
    }

    const data = JSON.parse(text);

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response received."
    );
  } catch (error) {
    console.error("Fetch Error:", error);
    return "❌ Unable to connect to NexusFly.";
  }
}