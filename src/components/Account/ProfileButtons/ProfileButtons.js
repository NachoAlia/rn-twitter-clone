import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./ProfileButtons.styles";
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'
import { sendFriendRequest, deleteFriendship } from '../../../config/api/Friends/friends';
import { UserContext } from '../../../context/UserProvider'

export const ProfileButtons = ({ isCurrentUser, myId, otherPersonId }) => {

  const { currentUser, setUpdateInfo, myFriends } = useContext(UserContext);
  const [showButtonAdd, setShowButtonAdd] = useState(false)
  const [showButtonLoading, setShowButtonLoading] = useState(false)
  const [showButtonDelete, setShowButtonDelete] = useState(false)
  const navigation = useNavigation();

  const goToEditProfile = () => {
    navigation.navigate(screen.account.editProfile);
  };

  // const algo = () => { console.log("jajajajaja:____", myFriends.friends) }


  const handleAdd = async () => {
    try {
      setShowButtonAdd(false)
      setShowButtonDelete(false)
      await sendFriendRequest(myId, otherPersonId);
      setUpdateInfo(true);
      setShowButtonLoading(true)
    } catch (error) {
      console.error("Error handling addFriend:", error);
      setUpdateInfo(true);
    }
  }

  const handleDelete = async () => {
    try {
      setShowButtonDelete(false)
      setShowButtonLoading(false)
      await deleteFriendship(myId, otherPersonId); // Pasa ambos IDs
      setUpdateInfo(true);
      setShowButtonAdd(true)
    } catch (error) {
      console.error("Error handling deleteFriend:", error);
      setUpdateInfo(true);
    }
  }

  useEffect(() => {
    if (!(myFriends.includedInFriendshipsAccepted(otherPersonId)) && !(myFriends.includedInFriendshipsPending(otherPersonId))) {
      setShowButtonLoading(false)
      setShowButtonDelete(false)
      setShowButtonAdd(true)


      console.log("add on:___", myFriends.includedInFriendshipsAccepted(otherPersonId));
    }

    if ((myFriends.includedInFriendshipsPending(otherPersonId))) {
      setShowButtonAdd(false)
      setShowButtonDelete(false)
      setShowButtonLoading(true)


      console.log("loading on:___", myFriends.includedInFriendshipsPending(otherPersonId));


    }

    if (myFriends.includedInFriendshipsAccepted(otherPersonId)) {
      setShowButtonAdd(false)
      setShowButtonLoading(false)
      setShowButtonDelete(true)

      console.log("deleted on:___", myFriends.includedInFriendshipsAccepted(otherPersonId));
    }
  }, [
    // handleAdd,
    // handleDelete,
    // currentUser,
    // setUpdateInfo,
    // myFriends,
    // myFriendsRequest,
    otherPersonId
  ])

  return (
    <View style={styles.buttonsContainer}>
      {isCurrentUser ? (
        <TouchableOpacity style={styles.editButton} onPress={() => goToEditProfile()}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <>
          {
            (showButtonAdd) &&
            <TouchableOpacity style={styles.friendButton} onPress={handleAdd}>
              <Text style={styles.friendButtonText}>Add Friend</Text>
            </TouchableOpacity>
          }

          {
            (showButtonLoading) &&
            <TouchableOpacity
              style={styles.friendButton}
              disabled={true}
            // activeOpacity={1}
            >
              <Text style={styles.friendButtonText}>This slope ...</Text>
            </TouchableOpacity>
          }

          {
            (showButtonDelete) &&
            <TouchableOpacity
              style={styles.friendButton}
              onPress={handleDelete}
            >
              <Text style={styles.friendButtonText}>Remove Friend</Text>
            </TouchableOpacity>
          }

          {/* <TouchableOpacity
            style={styles.notificationsButton}
            onPress={algo}
          >
            <Icon name="bell-outline" type="material-community" color="#ffffff" size={20} />
          </TouchableOpacity> */}
        </>
      )}
    </View>
  );
};