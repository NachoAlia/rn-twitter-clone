import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SigninScreen, SignupScreen } from "../screens/Account";

import { AccountDrawer } from "./AccountDrawer";

import { screen } from "../utils";
import { AppNavigation } from "./AppNavigation";
import { AccountStack } from "./AccountStack";

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator initialRouteName={screen.account.signin}>
      <Stack.Screen
        name={screen.account.signin}
        component={SigninScreen}
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screen.account.signup}
        component={SignupScreen}
        options={{
          title: "Sign Up",
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
