import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

interface VoiceFABProps {
  onTasksDetected: (tasks: string[]) => void;
}

export default function VoiceFAB({ onTasksDetected }: VoiceFABProps) {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    setProcessing(true);

    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(undefined);

      if (uri) {
        await transcribeAudio(uri);
      }
    } catch (error) {
      console.log("Error stopping", error);
      setProcessing(false);
    }
  }

  async function transcribeAudio(uri: string) {
    if (OPENAI_API_KEY === "YOUR_OPENAI_API_KEY") {
      Alert.alert(
        "Configuration Missing",
        "Please add your OpenAI API Key in VoiceFAB.tsx to use this feature."
      );
      setProcessing(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", {
        uri,
        name: "audio.m4a",
        type: "audio/m4a",
      } as any);
      formData.append("model", "whisper-1");

      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.text) {
        parseAndAddTasks(data.text);
      } else {
        console.log("No text in response", data);
        Alert.alert("Error", "Could not transcribe audio");
      }
    } catch (error) {
      console.log("Transcribe error", error);
      Alert.alert("Error", "Transcription failed");
    } finally {
      setProcessing(false);
    }
  }

  const parseAndAddTasks = (text: string) => {
    let tasks = text.split(/ and | then |, /i);

    tasks = tasks.map((t) => t.trim()).filter((t) => t.length > 0);

    if (tasks.length > 0) {
      onTasksDetected(tasks);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.fab, isRecording && styles.recordingFab]}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={processing}
      >
        {processing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={28}
            color="#fff"
          />
        )}
      </TouchableOpacity>

      {isRecording && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Listening...</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#6200ea",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordingFab: {
    backgroundColor: "red",
  },
  overlay: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 20,
  },
  overlayText: {
    color: "white",
    fontWeight: "bold",
  },
});
