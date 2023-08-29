import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./ProfileButtons.styles";
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

export const ProfileButtons = ({
  isCurrentUser,
  myId,
  otherPersonId,
}) => {

  const [isFriend, setIsFriend] = useState(false)
  // const [notifications, setNotifications] = useState(false)

  const navigation = useNavigation();

  const goToEditProfile = () => {
    navigation.navigate(screen.account.editProfile);
  };

  const handlerFriendship = () => {
    if (isFriend = false) {
      // si no es amigo debe enviar una solicitud de amistad
    } else {
      // si ya es amigo debe eliminar la amistad
    }
  }

  return (
    <View style={styles.buttonsContainer}>

      {isCurrentUser ? (

        <TouchableOpacity style={styles.editButton} onPress={() => goToEditProfile()}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

      ) : (

        <>
          <TouchableOpacity style={styles.friendButton} onPress={() => console.log(` ${myId} jajaj ${otherPersonId} `)}>
            <Text style={styles.friendButtonText}>
              {isFriend ? "Friend" : "Add Friend"}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.notificationsButton}
            onPress={() => console.log(notifications)}
          >
            <Icon
              name="bell-outline"
              type="material-community"
              color="#ffffff"
              size={20}
            />
          </TouchableOpacity> */}

        </>
      )}
    </View>
  );
};