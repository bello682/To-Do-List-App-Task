import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => onToggle(task.id)}
      >
        <Ionicons
          name={task.completed ? "checkbox" : "square-outline"}
          size={24}
          color={task.completed ? "#4CAF50" : "#555"}
        />
        <View style={styles.textWrapper}>
          <Text style={[styles.title, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          {task.description ? (
            <Text style={styles.description}>{task.description}</Text>
          ) : null}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash-outline" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    // simple shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteBtn: {
    padding: 5,
  },
});
