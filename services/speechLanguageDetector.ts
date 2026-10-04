import { SPEECH_LANGUAGES, SpeechLanguage } from "../components/Composer/config/speechLanguages";

export function detectSpeechLanguage(
  text: string
): SpeechLanguage {
  // Hindi / Devanagari
  if (/[\u0900-\u097F]/.test(text)) {
    return SPEECH_LANGUAGES.hindi;
  }

  // Assamese / Bengali script
  if (/[\u0980-\u09FF]/.test(text)) {
    return SPEECH_LANGUAGES.assamese;
  }

  // Default to English
  return SPEECH_LANGUAGES.english;
}