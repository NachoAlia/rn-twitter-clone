import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./ProfileButtons.styles";
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

export const ProfileButtons = ({
  isCurrentUser,
  isFollowing,
  onFollow,
  onNotifications,
}) => {

  const navigation = useNavigation();

  const goToEditProfile = () => {
    navigation.navigate(screen.account.editProfile);
  };

  return (
    <View style={styles.buttonsContainer}>
      {/* Botón de Editar Perfil */}
      {isCurrentUser && (
        <TouchableOpacity style={styles.editButton} onPress={() => goToEditProfile()}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}

      {/* Botón de Seguir */}
      {!isCurrentUser && (
        <TouchableOpacity style={styles.followButton} onPress={onFollow}>
          <Text style={styles.followButtonText}>
            {isFollowing ? "Siguiendo" : "Seguir"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Botón de Notificaciones */}
      {!isCurrentUser && (
        <TouchableOpacity
          style={styles.notificationsButton}
          onPress={onNotifications}
        >
          <Icon
            name="bell-outline"
            type="material-community"
            color="#ffffff"
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
