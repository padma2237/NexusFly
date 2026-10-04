import { API_URL } from "./api";

export async function transcribeSpeech(
  audioBase64: string,
  mimeType: string
): Promise<string> {
  if (!audioBase64) {
    throw new Error("Audio data is required.");
  }

  if (!mimeType) {
    throw new Error("Audio MIME type is required.");
  }

  const response = await fetch(
    API_URL.replace("/ask", "/transcribe-speech"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio: audioBase64,
        mimeType,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Speech transcription failed: ${response.status}`
    );
  }

  const data = await response.json();

  return data.text || "";
}