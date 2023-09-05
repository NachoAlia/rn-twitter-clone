import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./ProfileButtons.styles";
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'
import { sendFriendRequest, deleteFriendship } from '../../../config/api/Friends/friends';

export const ProfileButtons = ({ isCurrentUser, myId, otherPersonId }) => {
  const [isFriend, setIsFriend] = useState(false);
  const navigation = useNavigation();

  const goToEditProfile = () => {
    navigation.navigate(screen.account.editProfile);
  };

  const handleFriendship = async () => {
    try {
      if (!isFriend) {
        // Envía una solicitud de amistad
        await sendFriendRequest(myId, otherPersonId); // Pasa ambos IDs
        setIsFriend(true);
      } else {
        // Elimina la amistad
        await deleteFriendship(myId, otherPersonId); // Pasa ambos IDs
        setIsFriend(false);
      }
    } catch (error) {
      console.error("Error handling friendship:", error);
    }
  }


  // Agregar lógica para verificar si son amigos aquí y actualizar isFriend en consecuencia
  useEffect(() => {
    // Lógica para verificar si son amigos y actualizar isFriend en consecuencia
  }, []);

  return (
    <View style={styles.buttonsContainer}>
      {isCurrentUser ? (
        <TouchableOpacity style={styles.editButton} onPress={() => goToEditProfile()}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.friendButton} onPress={handleFriendship}>
            <Text style={styles.friendButtonText}>{isFriend ? "Friend" : "Add Friend"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.notificationsButton}
            onPress={() => console.log("proximamente")}
          >
            <Icon name="bell-outline" type="material-community" color="#ffffff" size={20} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};