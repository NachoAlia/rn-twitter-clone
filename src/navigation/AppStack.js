import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SigninScreen, SignupScreen } from "../screens/Account";

import { AccountDrawer } from "./AccountDrawer";

import { screen } from "../utils";
import { AppNavigation } from "./AppNavigation";
import { AccountStack } from "./AccountStack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export function AppStack() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    // Verificar la existencia de un token almacenado
    const token = await AsyncStorage.getItem("token");

    if (token) {
      // Realizar la autenticación automática utilizando el token
      // Aquí puedes implementar la lógica para verificar si el token es válido
      // y realizar cualquier acción necesaria, como cargar los datos del usuario
      // desde la API.

      // Ejemplo básico:
      // Si el token es válido, redirigir a la pantalla principal
      // navigation.navigate(screen.account.index);

      console.log(token);
    }

    // setIsLoading(false);
  };

  // if (isLoading) {
  //   // Mostrar una pantalla de carga mientras se verifica el token
  //   return null;
  // }

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
