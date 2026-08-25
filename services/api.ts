import { Message } from "../types/chat";
import { ApiResponse } from "./search/types";

import * as ImageManipulator from "expo-image-manipulator";

const API_URL =
  "https://nexusfly-backend.onrender.com/ask";

async function uriToBase64(uri: string) {
  const manipulated =
    await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: {
            width: 1280,
          },
        },
      ],
      {
        compress: 0.75,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

  return {
    base64: manipulated.base64!,
    mimeType: "image/jpeg",
  };
}

export async function sendMessage(
  messages: Message[],
  webSearch: boolean
): Promise<ApiResponse> {
  try {
    const contents = await Promise.all(
      messages.map(async (msg) => {
        const parts: any[] = [];

        if (msg.text?.trim()) {
          parts.push({
            text: msg.text,
          });
        }

        if (msg.attachments?.length) {
          for (const attachment of msg.attachments) {
            const isImage =
              attachment.type === "image" ||
              attachment.type === "camera";

            if (!isImage) {
              continue;
            }

            try {
              const image = await uriToBase64(
                attachment.uri
              );

              parts.push({
                inlineData: {
                  mimeType: image.mimeType,
                  data: image.base64,
                },
              });
            } catch (error) {
              console.error(
                "Failed to read image:",
                error
              );
            }
          }
        }

        return {
          role:
            msg.role === "assistant"
              ? "model"
              : "user",
          parts,
        };
      })
    );

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webSearch,
        contents,
      }),
    });

    const text = await response.text();

    
    
    if (!response.ok) {
  console.log("SERVER STATUS:", response.status);
  console.log("SERVER RESPONSE:", text);

  return {
    answer: `Server Error (${response.status})`,
    sources: [],
  };
}
    
    

    try {
      return JSON.parse(text) as ApiResponse;
    } catch {
      return {
        answer: "Invalid response from server.",
        sources: [],
      };
    }
  } catch (error) {
    console.error("Fetch Error:", error);

    return {
      answer: "❌ Unable to connect to NexusFly.",
      sources: [],
    };
  }
}