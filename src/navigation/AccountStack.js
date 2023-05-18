import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "../screens/Account";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: false }}
    >
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{
          title: "Mi cuenta",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
