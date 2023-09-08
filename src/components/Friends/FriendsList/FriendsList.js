import React, { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { getFriends, deleteFriendship } from "../../../config/api/Friends/friends";
import { LoadingModal } from "../../Shared";
import { useNavigation } from "@react-navigation/native";
import { GoToUserProfile } from '../../../utils'
import {
    Avatar,
    Text,
    Image,
    Icon,
} from "react-native-elements";
import { UserContext } from '../../../context/UserProvider'
import { styles } from './FriendsList.styles'
import { color } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";

export function FriendsList({ userId }) {

    const { currentUser, setUpdateInfo } = useContext(UserContext);

    const navigation = useNavigation();
    const theme = useThemaContext();
    const [refreshing, setRefreshing] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        handleGetFriends(userId);
    }, []);

    const handleGetFriends = async (userId) => {
        try {
            setShowLoading(true);
            const requests = await getFriends(userId);
            console.log(requests);
            setFriends(requests);
            setShowLoading(false);
        } catch (error) {
            console.error("Error get friends:", error);
            setShowLoading(false);
        }
    };

    const deleteRequest = async (myId, requestId) => {
        try {
            setShowLoading(true);
            const requests = await deleteFriendship(myId, requestId);
            setUpdateInfo(true);
            setShowLoading(false);
        } catch (error) {
            console.error("Error deleted friend requests:", error);
            setShowLoading(false);
        }
    };

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: theme
                    ? color.light.background
                    : color.dark.background,
            }
        ]}>
            <Text style={[
                styles.header,
                {
                    color: color.dark.corporate
                }
            ]}>My Friends</Text>
            <FlatList
                contentContainerStyle={styles.list}
                data={friends}
                keyExtractor={(friend) => friend.id}
                refreshing={refreshing}
                onRefresh={async () => {
                    setRefreshing(true);
                    await handleGetFriends(userId);
                    setRefreshing(false);
                }}
                renderItem={({ item }) => (
                    <View style={styles.friendItem}>


                        {item.friend_id.url_profile_photo ? (
                            <Avatar
                                size="large"
                                rounded
                                source={{ uri: item.friend_id.url_profile_photo }}
                                onPress={() => GoToUserProfile(navigation, item.friend_id.id)}
                            />
                        ) : (

                            <Avatar
                                size="large"
                                rounded
                                source={require("../../../../assets/icons/default_user_photo.png")}
                                onPress={() => GoToUserProfile(navigation, item.friend_id.id)}
                            />

                        )}
                        <View>
                            <Text
                                style={[
                                    styles.friendUsername,
                                    {
                                        color: theme ? color.light.text : color.dark.text,
                                    }
                                ]}
                            >
                                {item.friend_id.username}
                            </Text>
                            <Text
                                style={[
                                    styles.friendUsername,
                                    {
                                        color: theme ? color.light.textSecondary : color.dark.textSecondary,
                                    }
                                ]}
                            >
                                Is friend
                            </Text>
                        </View>
                        <Icon
                            name="delete"
                            type="material-community"
                            size={35}
                            color={theme
                                ? color.light.textSecondary
                                : color.dark.textSecondary}
                            onPress={() => deleteRequest(item.user_id, item.id)}
                        />
                    </View>
                )}
            />
            <LoadingModal show={showLoading} text="Cargando amigos..." />
        </View>
    );
}
