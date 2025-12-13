import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadTasks, saveTasks } from "../utils/storage";
import { Task } from "../types";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    const currentTasks = await loadTasks();
    const updatedTasks = [newTask, ...currentTasks];
    await saveTasks(updatedTasks);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Buy Milk"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />

      <Text style={styles.label}>Description (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Details..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.btnContainer}>
        <Button title="Save Task" onPress={handleSave} color="#6200ea" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  btnContainer: {
    marginTop: 10,
  },
});
