import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { UserButtonGroup } from "../../../components/Account/UserButtonGroup/UserButtonGroup";
import { ScrollView } from "react-native-gesture-handler";
import { useThemaContext } from "../../../components/ThemeProvider";

import { InfoUser } from "../../../components/Account/InfoUser/InfoUser";

import { styles } from "./AccountScreen.styles";
import { color } from "../../../utils";

import { useNavigation, useRoute } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

import { UserContext } from "../../../context/UserProvider";

import { SearchUserById } from "../../../config/api/Profile";
import { UserPosts } from "../../../components/Account";

export function AccountScreen() {
  const navigation = useNavigation();
  const thema = useThemaContext();
  const { currentUser, updateInfo } = useContext(UserContext);
  const [countPosts, setCountPosts] = useState(null);
  const route = useRoute();

  const profileUID =
    route.params && route.params.user_id
      ? route.params.user_id
      : currentUser.id;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await SearchUserById(profileUID);
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [profileUID, updateInfo]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          type="material-community"
          name="arrow-left"
          containerStyle={{ marginLeft: 0, marginRight: 30 }}
          size={24}
          color={thema ? color.light.text : color.dark.text}
          onPress={() => navigation.navigate(screen.home.tab)}
        />
      ),
      headerTitle: userData
        ? userData.nickname
          ? userData.nickname
          : "@" + userData.username
        : currentUser.nickname
        ? currentUser.nickname
        : "@" + currentUser.username,
      headerTintColor: thema ? color.light.text : color.dark.text,
      headerStyle: {
        backgroundColor: thema ? color.light.background : color.dark.background,
      },
    });
  }, [thema, userData, updateInfo]);
  return (
    <View
      style={[
        styles.content,
        {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <ScrollView>
        {userData && (
          <InfoUser
            userData={userData}
            isCurrent={currentUser.id === userData?.id}
            postCounter={{ countPosts, setCountPosts }}
          />
        )}

        {/* <UserButtonGroup /> */}
        {userData && (
          <UserPosts
            userData={userData}
            postCounter={{ countPosts, setCountPosts }}
          />
        )}
      </ScrollView>
    </View>
  );
}
