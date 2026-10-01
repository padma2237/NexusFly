import { useEffect, useState } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

export function useSpeechRecognition(
  onTranscript: (text: string) => void
) {
  const [isListening, setIsListening] = useState(false);

  useSpeechRecognitionEvent("start", () => {
    setIsListening(true);
  });

  useSpeechRecognitionEvent("end", () => {
    setIsListening(false);
  });

  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript;

    if (transcript) {
      onTranscript(transcript);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech recognition error:", event.error);
    setIsListening(false);
  });

  useEffect(() => {
    return () => {
      ExpoSpeechRecognitionModule.abort();
    };
  }, []);

  const startListening = async () => {
    const permission =
      await ExpoSpeechRecognitionModule.requestPermissionsAsync();

    if (!permission.granted) {
      console.log("Microphone/speech permission not granted.");
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
      addsPunctuation: true,
    });
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  return {
    isListening,
    startListening,
    stopListening,
  };
}