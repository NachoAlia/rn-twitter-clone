import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, View } from "react-native-elements";

import { HomeStack } from "./HomeStack";
import { SearchStack } from "./SearchStack";
import { NotificationStack } from "./NotificationStack";
import { MessagesStack } from "./MessagesStack";
import { AccountStack } from "./AccountStack";

import { screen, color } from "../utils";
import { useThemaContext } from "../components/ThemeProvider";
import { PostStack } from "./PostStack";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  const thema = useThemaContext();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: color.light.corporate,
        tabBarInactiveTintColor: color.light.alternative,
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
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
