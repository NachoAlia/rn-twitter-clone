import { View, Text } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import { AppNavigation } from "./AppNavigation";
import { AccountScreen } from "../screens/Account";

import { DrawerUserInfo } from "../components/DrawerContent/DrawerUserInfo";

import { screen } from "../utils/screenName";
import { DrawerOptions } from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

export function AccountDrawer() {
  const navigation = useNavigation();
  const renderAccount = () => {
    return (
      <View style={{ width: "100%" }}>
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
            backgroundColor: "#c2c2c2",
          }}
        ></View>
        <View style={{ marginTop: 20, marginLeft: 0 }}>
          <DrawerOptions />
        </View>
      </View>
    );
  };

  return (
    <Drawer.Navigator drawerContent={() => renderAccount()}>
      <Drawer.Screen
        name="App"
        component={AppNavigation}
        options={{
          title: (
            <Image
              source={require("../../assets/icons/logo_owl.png")}
              style={{ width: 80, height: 30, resizeMode: "center" }}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{
          swipeEnabled: false,
          headerLeft: () => (
            <Icon
              type="material-community"
              name="arrow-left"
              iconStyle={{ marginLeft: 10 }}
              size={28}
              onPress={() => navigation.navigate(screen.home.tab)}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
