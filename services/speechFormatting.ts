import { API_URL } from "./api";

export async function formatSpeechText(
  text: string
): Promise<string> {
  const response = await fetch(
    API_URL.replace("/ask", "/format-speech"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Speech formatting failed: ${response.status}`
    );
  }

  const data = await response.json();

  return data.text || text;
}