import React, { useContext } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { HomeStack } from "./HomeStack";
import { SearchStack } from "./SearchStack";
import { NotificationStack } from "./NotificationStack";
import { MessagesStack } from "./MessagesStack";
import { AccountStack } from "./AccountStack";

import { screen, color } from "../utils";
import { useThemaContext } from "../components/ThemeProvider";
import { PostStack } from "./PostStack";
import { TabBarContext } from "../context";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  const { tabBarScreenOptions } = useContext(TabBarContext);
  const thema = useThemaContext();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: color.light.corporate,
        tabBarInactiveTintColor: color.light.alternative,
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
          borderTopColor: color.light.corporate,
          borderTopWidth: 2,
        },
        ...tabBarScreenOptions,
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
      <Tab.Screen
        name={screen.post.tab}
        component={PostStack}
        options={{
          title: "",
          tabBarButton: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;
  if (route.name === screen.home.tab) {
    iconName = "home-outline";
    size = 28;
  }
  if (route.name === screen.search.tab) {
    iconName = "magnify";
    size = 28;
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
