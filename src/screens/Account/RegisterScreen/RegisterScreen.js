import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>LoginScreen</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginHorizontal: 5 }}>
          <Button
            title="TestRegistrarme"
            onPress={() => navigation.navigate(screen.account.index)}
          />
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Button
            title="TestVolverAlLogin"
            onPress={() => navigation.navigate(screen.account.login)}
          />
        </View>
      </View>
    </View>
  );
}
