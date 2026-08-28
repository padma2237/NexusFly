import {
  Message
} from "../types/chat";

import {
  ApiResponse
} from "./search/types";

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


async function fileUriToBase64(
  uri: string,
  mimeType: string
) {
  const response = await fetch(uri);
  const blob = await response.blob();

  return new Promise<{
    base64: string;
    mimeType: string;
  }>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;

      const commaIndex =
        result.indexOf(",");

      resolve({
        base64:
          commaIndex >= 0
            ? result.substring(
                commaIndex + 1
              )
            : result,

        mimeType:
          blob.type ||
          mimeType ||
          "application/octet-stream",
      });
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}


export async function sendMessage(
  messages: Message[],
  webSearch: boolean,
  signal?: AbortSignal
): Promise<ApiResponse> {

  try {

    const contents =
      await Promise.all(
        messages.map(async (msg) => {

          const parts: any[] = [];

          if (msg.text?.trim()) {
            parts.push({
              text: msg.text,
            });
          }


          if (msg.attachments?.length) {

            for (
              const attachment
              of msg.attachments
            ) {

              const isImage =
                attachment.type === "image" ||
                attachment.type === "camera";

              const isFile =
                attachment.type === "file";


              try {

                if (isImage) {

                  const image =
                    await uriToBase64(
                      attachment.uri
                    );

                  parts.push({
                    inlineData: {
                      mimeType:
                        image.mimeType,

                      data:
                        image.base64,
                    },
                  });
                }


                if (isFile) {

                  const mimeType =
                    attachment.mimeType ||
                    "application/pdf";

                  const file =
                    await fileUriToBase64(
                      attachment.uri,
                      mimeType
                    );

                  parts.push({
                    inlineData: {
                      mimeType:
                        file.mimeType,

                      data:
                        file.base64,
                    },
                  });
                }

              } catch (error) {

                console.error(
                  "Failed to read attachment:",
                  attachment.name,
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


    const response =
      await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          webSearch,
          contents,
        }),

        signal,
      });


    const text =
      await response.text();


    if (!response.ok) {

      console.log(
        "SERVER STATUS:",
        response.status
      );

      console.log(
        "SERVER RESPONSE:",
        text
      );

      return {
        answer:
          `Server Error (${response.status})`,

        sources: [],
      };
    }


    try {

      return JSON.parse(
        text
      ) as ApiResponse;

    } catch {

      return {
        answer:
          "Invalid response from server.",

        sources: [],
      };
    }


  } catch (error) {

    /*
     * AbortController cancellation is
     * intentional. Do not treat it as
     * an AI/server error.
     */

    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      throw error;
    }


    console.error(
      "Fetch Error:",
      error
    );


    return {
      answer:
        "❌ Unable to connect to NexusFly.",

      sources: [],
    };
  }
}