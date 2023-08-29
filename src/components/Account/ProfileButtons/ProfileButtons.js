import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./ProfileButtons.styles";
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendFriendRequest, acceptFriendRequest } from "../../../config/api/Friends/Friendships";

export const ProfileButtons = ({
  isCurrentUser,
  myId,
  otherPersonId,
}) => {

  const [isFriend, setIsFriend] = useState(false)
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [friendshipId, setFriendshipId] = useState(null);

  // const [notifications, setNotifications] = useState(false)

  const navigation = useNavigation();

  const goToEditProfile = () => {
    navigation.navigate(screen.account.editProfile);
  };

  const checkFriendshipStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${apiUrl}/status/${otherPersonId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const data = await response.json();
      setIsFriend(data.isFriend);
      setHasPendingRequest(data.hasPendingRequest);
      setFriendshipId(data.friendshipId);
    } catch (error) {
      console.error("Error checking friendship status:", error);
    }
  };

  const handleFriendship = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (isFriend) {
        // Si ya son amigos, eliminar la amistad
        const response = await fetch(`${apiUrl}/${friendshipId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error);
        }

        setIsFriend(false);
      } else {
        // Si no son amigos, enviar una solicitud de amistad
        const response = await sendFriendRequest(otherPersonId, token);

        if (response.message === "Friend request sent.") {
          setIsFriend(true);
        }
      }
    } catch (error) {
      console.error("Error handling friendship:", error);
    }
  };

  const acceptFriendship = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await acceptFriendRequest(friendshipId, token);

      if (response.message === "Friend request accepted.") {
        setIsFriend(true);
        setHasPendingRequest(false);
      }
    } catch (error) {
      console.error("Error accepting friendship:", error);
    }
  };

  useEffect(() => {
    checkFriendshipStatus();
  }, []);

  return (
    <View style={styles.buttonsContainer}>

      {isCurrentUser ? (

        <TouchableOpacity style={styles.editButton} onPress={() => goToEditProfile()}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

      ) : (

        <>
          <TouchableOpacity style={styles.followButton} onPress={() => console.log(` ${myId} jajaj ${otherPersorId} `)}>
            <Text style={styles.followButtonText}>
              {isFriend ? "Friend" : "Add Friend"}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.notificationsButton}
            onPress={console.log(notifications)}
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
