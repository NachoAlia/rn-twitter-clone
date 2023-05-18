import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import { AppNavigation } from "./AppNavigation";
import { AccountScreen } from "../screens/Account";

import { screen } from "../utils/screenName";

const Drawer = createDrawerNavigator();

export function AccountDrawer() {
  const navigation = useNavigation();
  const renderAccount = () => {
    return (
      <View style={{ margin: 40 }}>
        <Text>Avatar</Text>
        <Button
          title="Ver perfil"
          onPress={() => navigation.navigate(screen.account.account)}
        />
      </View>
    );
  };

  return (
    <Drawer.Navigator drawerContent={() => renderAccount()}>
      <Drawer.Screen name="App" component={AppNavigation} />
      <Drawer.Screen name={screen.account.account} component={AccountScreen} />
    </Drawer.Navigator>
  );
}
