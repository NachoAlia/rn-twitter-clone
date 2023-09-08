import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Icon, Image } from "react-native-elements";

import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import { AppNavigation } from "./AppNavigation";

import { DrawerUserInfo } from "../components/DrawerContent/DrawerUserInfo";

import { screen } from "../utils/screenName";
import { DrawerOptions } from "../components/DrawerContent";
import { ChangeThema } from "../components/Thema";
import { useThemaContext } from "../components/ThemeProvider";
import { color } from "../utils";
import { AccountStack } from "./AccountStack";
import { BookmarkStack } from "./BookmarkStack";
import { PostStack } from "./PostStack";
import { DrawerContext } from "../context";

const Drawer = createDrawerNavigator();

export function AccountDrawer() {
  const { drawerScreenOptions, setDrawerNavigation } =
    useContext(DrawerContext);
  const thema = useThemaContext();

  const renderAccount = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        }}
      >
        <View style={{ marginTop: 25, marginLeft: 20 }}>
          <View
            style={{
              marginHorizontal: -20,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/logo_owl.png")}
              style={{
                width: 50,
                height: 40,
                resizeMode: "center",
              }}
            />
          </View>
          <DrawerUserInfo />
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            opacity: 0.4,
            marginTop: -5,
            backgroundColor: "#c4c4c4",
          }}
        />
        <View style={{ marginTop: 20, marginLeft: 0 }}>
          <DrawerOptions />
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            opacity: 0.4,
            marginTop: -5,
            backgroundColor: "#c4c4c4",
          }}
        />
        <ChangeThema />
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={() => renderAccount()}
      screenOptions={{
        headerTintColor: thema ? color.light.corporate : color.dark.corporate,
        title: (
          <Image
            source={require("../../assets/icons/logo_owl.png")}
            style={{ width: 80, height: 30, resizeMode: "center" }}
          />
        ),
        headerTitleAlign: "center",
        headerTitleStyle: { width: "100%" },
        drawerStyle: {
          width: "55%",
          //borderRightWidth: 1,
          //borderRightColor: "#c4c4c4",
        },
        ...drawerScreenOptions,
      }}
    >
      <Drawer.Screen
        name="App"
        component={AppNavigation}
        options={{
          drawerItemStyle: { color: color.light.corporate },

          headerStyle: {
            backgroundColor: thema
              ? color.light.background
              : color.dark.background,
          },
        }}
      />
      <Drawer.Screen
        name={screen.account.account}
        component={AccountStack}
        options={{
          swipeEnabled: false,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={screen.bookmark.tab}
        component={BookmarkStack}
        options={{
          swipeEnabled: false,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
