import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, View } from "react-native";
import {
    Avatar,
    Text,
    Image,
    Icon,
} from "react-native-elements";

import { Modal, LoadingModal } from "../../Shared";
import { getPendingFriendRequests, acceptFriendship, deleteFriendship } from "../../../config/api/Friends/friends";
import { styles } from './PendingFriendRequestsModal.styles'
import Toast from "react-native-toast-message";
import { color } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";



export function PendingFriendRequestsModal({ userId }) {

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const theme = useThemaContext();
    const [pendingRequests, setPendingRequests] = useState([]);

    const fetchPendingRequests = async () => {
        try {
            setShowLoading(true);
            const requests = await getPendingFriendRequests(userId);
            setPendingRequests(requests.received_friend_requests);
            setShowLoading(false);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching pending friend requests:", error);
            setShowLoading(false);
            setShowModal(false);
        }
        // setShowModal(true);
    };
    const acceptRequest = async (myId, requestId) => {
        try {
            setShowLoading(true);
            const requests = await acceptFriendship(myId, requestId);
            setShowLoading(false);
            setShowModal(false);
        } catch (error) {
            console.error("Error accepted friend requests:", error);
            setShowLoading(false);
        }
    };

    const deleteRequest = async (myId, requestId) => {
        try {
            setShowLoading(true);
            const requests = await deleteFriendship(myId, requestId);
            setShowLoading(false);
        } catch (error) {
            console.error("Error deleted friend requests:", error);
            setShowLoading(false);
        }
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => fetchPendingRequests()}
            >
                <Icon name="account-multiple-plus" type="material-community" size={32} color="#c19659" />
                <Text
                    style={{
                        fontSize: 22,
                        paddingHorizontal: 10,
                        color: theme ? color.light.text : color.dark.text,
                    }}
                >
                    Pending Friendships Request
                </Text>
                <Icon name="chevron-down" type="material-community" size={32} color="#c19659" />
            </TouchableOpacity>
            <Modal show={showModal} close={() => setShowModal(false)}>
                <View
                    style={[
                        styles.containerModal,
                        {
                            backgroundColor: theme
                                ? color.light.background
                                : color.dark.background,
                        },
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={[
                            styles.title,
                            {
                                color: color.dark.corporate
                            }
                        ]}>Friend Requests</Text>
                        <TouchableOpacity style={styles.buttonClose} onPress={() => setShowModal(false)}>
                            <Icon
                                name="close"
                                size={40}
                                color={theme
                                    ? color.light.text
                                    : color.dark.text}
                                type="material-community"
                            />
                        </TouchableOpacity>
                    </View>
                    {pendingRequests.length > 0 ? (
                        <FlatList
                            data={pendingRequests}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.avatarContainer}>


                                    {item.user_id.url_profile_photo ? (
                                        <Avatar
                                            size="medium"
                                            rounded
                                            containerStyle={styles.avatar}
                                            source={{ uri: item.user_id.url_profile_photo }}
                                        />
                                    ) : (

                                        <Avatar
                                            size="medium"
                                            rounded
                                            containerStyle={styles.avatar}
                                            source={require("../../../../assets/icons/default_user_photo.png")}
                                        />

                                    )}


                                    <View>
                                        <Text style={[
                                            styles.username,
                                            {
                                                color: theme
                                                    ? color.light.text
                                                    : color.dark.text
                                            }
                                        ]}>{item.user_id.username}</Text>
                                        <Text
                                            style={[
                                                styles.status,
                                                {
                                                    color: theme
                                                        ? color.light.textSecondary
                                                        : color.dark.alternative
                                                }
                                            ]}
                                        >{item.status}</Text>
                                    </View>
                                    <View style={styles.actionButtons}>

                                        <View style={styles.containerButtonDelete} >
                                            <Icon
                                                name="delete"
                                                type="material-community"
                                                size={35}
                                                color={color.dark.textSecondary}
                                                onPress={() => deleteRequest(item.friend_id, item.id)}
                                            />
                                        </View>
                                        <Icon
                                            name="check"
                                            type="material-community"
                                            size={35}
                                            color="#c19659"
                                            onPress={() => acceptRequest(item.friend_id, item.id)}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    ) : (
                        <Text style={[
                            styles.none,
                            {
                                color: theme
                                    ? color.light.textSecondary
                                    : color.dark.alternative
                            }
                        ]}>No pending requests 😓</Text>
                    )}

                </View>
            </Modal>
            <LoadingModal show={showLoading} text="Charging requests..." />
        </View>
    );
}
