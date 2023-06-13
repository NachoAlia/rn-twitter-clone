import { View, Text } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import { AppNavigation } from "./AppNavigation";
//import { AccountScreen } from "../screens/Account";

import { DrawerUserInfo } from "../components/DrawerContent/DrawerUserInfo";

import { screen } from "../utils/screenName";
import { DrawerOptions } from "../components/DrawerContent";
import { ChangeThema } from "../components/Thema";
import { useThemaContext } from "../components/ThemeProvider";
import { color } from "../utils";
import { AccountStack } from "./AccountStack";

const Drawer = createDrawerNavigator();

export function AccountDrawer() {
  const navigation = useNavigation();
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
        <View style={{ marginTop: 40, marginLeft: 20 }}>
          <Image
            source={require("../../assets/icons/logo_owl.png")}
            style={{ width: 100, height: 60, resizeMode: "center" }}
          ></Image>
          <DrawerUserInfo />
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            marginTop: 10,
            backgroundColor: thema ? color.light.contrast : color.dark.contrast,
          }}
        />
        <View style={{ marginTop: 20, marginLeft: 0 }}>
          <DrawerOptions />
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            marginTop: 10,
            backgroundColor: thema ? color.light.contrast : color.dark.contrast,
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
        headerTintColor: "red",
      }}
    >
      <Drawer.Screen
        name="App"
        component={AppNavigation}
        options={{
          drawerItemStyle: { color: color.light.corporate },
          title: (
            <Image
              source={require("../../assets/icons/logo_owl.png")}
              style={{ width: 80, height: 30, resizeMode: "center" }}
            />
          ),
          headerTitleAlign: "center",
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
    </Drawer.Navigator>
  );
}
