import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen, EditProfileScreen } from "../screens/Account";
import { screen } from "../utils";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: true }}
    >
      <Stack.Screen
        name={screen.account.accountProfile}
        component={AccountScreen}
        options={{
          title: "Account",
          headerLeft: () => (
            <Icon
              type="material-community"
              name="arrow-left"
              iconStyle={{ marginLeft: 0, marginRight: 30 }}
              size={24}
              onPress={() => navigation.navigate(screen.home.tab)}
            />
          ),
        }}
      />
      <Stack.Screen
        name={screen.account.editProfile}
        component={EditProfileScreen}
        options={{
          title: "Edit profile",
        }}
      />
    </Stack.Navigator>
  );
}
