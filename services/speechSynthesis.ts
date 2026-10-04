import * as Speech from "expo-speech";

export function speakText(
  text: string,
  language: string = "en-US"
) {
  const trimmed = text.trim();

  if (!trimmed) {
    return;
  }

  Speech.speak(trimmed, {
    language,
  });
}

export function stopSpeaking() {
  Speech.stop();
}

export function isSpeaking() {
  return Speech.isSpeakingAsync();
}