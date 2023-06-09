import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, RegisterScreen } from "../screens/Account";

import { AccountDrawer } from "./AccountDrawer";

import { screen } from "../utils";
import { AppNavigation } from "./AppNavigation";
import { AccountStack } from "./AccountStack";
const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator initialRouteName={screen.account.login}>
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{
          title: "Iniciar Sesion",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={RegisterScreen}
        options={{
          title: "Registrarse",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screen.account.index}
        component={AccountDrawer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
