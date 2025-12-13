import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { loadTasks, saveTasks } from "../utils/storage";
import TaskItem from "../components/TaskItem";
import VoiceFAB from "../components/VoiceFAB";
import { Task } from "../types";

type RootStackParamList = {
  MyTasks: undefined;
  AddTask: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyTasks"
>;

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const data = await loadTasks();
    setTasks(data);
  };

  const handleToggle = async (id: string) => {
    const newTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
    await saveTasks(newTasks);
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const newTasks = tasks.filter((t) => t.id !== id);
          setTasks(newTasks);
          await saveTasks(newTasks);
        },
      },
    ]);
  };

  const handleVoiceTasks = async (newTitles: string[]) => {
    const newItems: Task[] = newTitles.map((title) => ({
      id: Date.now().toString() + Math.random(),
      title: title,
      completed: false,
    }));

    const updated = [...newItems, ...tasks];
    setTasks(updated);
    await saveTasks(updated);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <View style={styles.container}>
      {sortedTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
        </View>
      ) : (
        <FlatList
          data={sortedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <VoiceFAB onTasksDetected={handleVoiceTasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});
