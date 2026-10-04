import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

export function useSpeechRecording() {
  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const recorderState =
    useAudioRecorderState(recorder);

  const startRecording = async () => {
    const permission =
      await AudioModule.requestRecordingPermissionsAsync();

    if (!permission.granted) {
      throw new Error(
        "Microphone permission is required."
      );
    }

    await recorder.prepareToRecordAsync();
    recorder.record();
  };

  const stopRecording = async () => {
    await recorder.stop();
    
    return recorder.uri;
  };

  return {
    isRecording: recorderState.isRecording,
    startRecording,
    stopRecording,
  };
}