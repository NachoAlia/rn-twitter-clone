import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { screen } from "../../../utils/screenName";
export function AccountScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={{ alignSelf: "center" }}>AccountScreen</Text>
      <Button
        title="testvolver"
        onPress={() => navigation.navigate(screen.home.tab)}
      />
    </View>
  );
}
