import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../theme/useTheme";
import { Ionicons } from "@expo/vector-icons";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function InteractiveScreen() {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Analyze last model run parameters", completed: false },
    { id: "2", text: "Optimize prompt tokens for NexusFly", completed: true },
  ]);
  const [inputText, setInputText] = useState("");

  const addTask = () => {
    if (!inputText.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: inputText.trim(), completed: false },
    ]);
    setInputText("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Action Planner</Text>
        <Text style={styles.subtitle}>Dynamic interactive workflows</Text>
      </View>

      {/* Input Row */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border || "#E5E7EB" }]}
          placeholder="Add a dynamic app task..."
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={addTask}>
          <Ionicons name="send" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Interactive List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, { backgroundColor: colors.surface || "#FFF", borderColor: colors.border || "#E5E7EB" }]}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.checkArea}>
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? "#10B981" : "#9CA3AF"}
              />
              <Text
                style={[
                  styles.taskText,
                  {
                    color: item.completed ? "#9CA3AF" : colors.text,
                    textDecorationLine: item.completed ? "line-through" : "none",
                  },
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "800" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  inputContainer: { flexDirection: "row", paddingHorizontal: 20, marginBottom: 15 },
  input: { flex: 1, height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, fontSize: 15, marginRight: 10 },
  addButton: { width: 48, height: 48, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  taskItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1 },
  checkArea: { flexDirection: "row", alignItems: "center", flex: 1 },
  taskText: { marginLeft: 12, fontSize: 15, fontWeight: "500", flex: 1 },
  deleteButton: { padding: 5 },
});
