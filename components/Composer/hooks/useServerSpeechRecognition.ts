import { useRef, useState } from "react";

import { useSpeechRecording } from "./useSpeechRecording";

import { audioFileToBase64 } from "../../../services/speechRecording";
import { transcribeSpeech } from "../../../services/speechTranscription";

export function useServerSpeechRecognition(
  onChangeText: (text: string) => void,
  value: string
) {
  const {
    isRecording,
    startRecording,
    stopRecording,
  } = useSpeechRecording();

  const [isTranscribing, setIsTranscribing] =
    useState(false);

  const baseTextRef = useRef(value);

  const startListening = async () => {
    baseTextRef.current = value;

    await startRecording();
  };

  const stopListening = async () => {
    try {
      setIsTranscribing(true);

      const uri = await stopRecording();

      if (!uri) {
        throw new Error(
          "Recording URI was not available."
        );
      }

      const audioBase64 =
        await audioFileToBase64(uri);

      const transcript =
        await transcribeSpeech(
          audioBase64,
          "audio/mp4"
        );

      if (!transcript) {
        return;
      }

      const previousText =
        baseTextRef.current.trim();

      const finalText = previousText
        ? `${previousText} ${transcript}`
        : transcript;

      onChangeText(finalText);

    } catch (error) {
      console.error(
        "Server speech recognition error:",
        error
      );
    } finally {
      setIsTranscribing(false);
    }
  };

  return {
    isListening: isRecording,
    isTranscribing,
    startListening,
    stopListening,
  };
}