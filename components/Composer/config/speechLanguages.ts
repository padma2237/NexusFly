export const SPEECH_LANGUAGES = {
  english: "en-US",
  hindi: "hi-IN",
  assamese: "as-IN",
} as const;

export type SpeechLanguage =
  (typeof SPEECH_LANGUAGES)[keyof typeof SPEECH_LANGUAGES];
  
export type SpeechLanguageMode =
  | "auto"
  | "english"
  | "hindi"
  | "assamese";