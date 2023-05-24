import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { UserButtonGroup } from "../../../components/Account/UserButtonGroup/UserButtonGroup";
import { screen } from "../../../utils/screenName";
import { styles } from "./AccountScreen.styles";
import { InfoUser } from "../../../components/Account/InfoUser/InfoUser";
import { ScrollView } from "react-native-gesture-handler";

export function AccountScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <ScrollView>
        <InfoUser />
        <UserButtonGroup />
      </ScrollView>
    </View>
  );
}
