import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, View } from "react-native-elements";

import { HomeStack } from "./HomeStack";
import { SearchStack } from "./SearchStack";
import { NotificationStack } from "./NotificationStack";
import { MessagesStack } from "./MessagesStack";
import { AccountStack } from "./AccountStack";

import { screen } from "../utils";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={screen.home.tab}
        component={HomeStack}
        options={{
          title: "",
        }}
      />
      <Tab.Screen
        name={screen.search.tab}
        component={SearchStack}
        options={{
          title: "",
        }}
      />
      <Tab.Screen
        name={screen.notifications.tab}
        component={NotificationStack}
        options={{
          title: "",
        }}
      />
      <Tab.Screen
        name={screen.messages.tab}
        component={MessagesStack}
        options={{
          title: "",
        }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;
  if (route.name === screen.home.tab) {
    iconName = "home-outline";
  }
  if (route.name === screen.search.tab) {
    iconName = "magnify";
  }
  if (route.name === screen.notifications.tab) {
    iconName = "bell-outline";
  }
  if (route.name === screen.messages.tab) {
    iconName = "message-outline";
  }

  return (
    <Icon type="material-community" name={iconName} size={size} color={color} />
  );
}
