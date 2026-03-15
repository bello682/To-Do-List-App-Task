import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  MyTasks: undefined;
  AddTask: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#6200ea" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* <Stack.Screen
          name="MyTasks"
          component={HomeScreen}
          options={({
            navigation,
          }: {
            navigation: NativeStackNavigationProp<RootStackParamList>;
          }) => ({
            title: "My Tasks",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AddTask")}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        /> */}

        <Stack.Screen
          name="MyTasks"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "My Tasks",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AddTask")}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            ),
            // Ensure the header style is set here or in the Navigator
            headerStyle: { backgroundColor: "#6200ea" },
            headerTintColor: "#fff",
          })}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: "New Task" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
