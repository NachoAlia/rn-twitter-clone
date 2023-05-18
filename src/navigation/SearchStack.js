import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from "../screens/Search";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: false }}
    >
      <Stack.Screen
        name={screen.search.search}
        component={SearchScreen}
        options={{
          title: "Search",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
