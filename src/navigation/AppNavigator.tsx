// src/navigation/AppNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import ResetAppScreen from "../screens/ResetAppScreen";
import HomeScreen from "../screens/HomeScreen";
import MedicamentoStackNavigator from "./MedicamentoStackNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Mi lista" // <-- Esta línea establece la pestaña inicial
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarStyle: {
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Reiniciar App"
        component={ResetAppScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tools" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Mi lista"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Medicamentos"
        component={MedicamentoStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "ListaMedicamentos";
          const isForm = routeName === "MedicamentoFormScreen";

          return {
            tabBarStyle: isForm
              ? { display: "none" }
              : {
                  paddingBottom: 8,
                  backgroundColor: "#fff",
                },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
}
