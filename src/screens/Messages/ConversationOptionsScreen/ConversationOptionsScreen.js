import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ConversationOptionsScreen.styles";
import { Modal } from "../../../components/Shared/Modal/Modal";
import { Icon } from "react-native-elements";
import { color } from "../../../utils";
import { domainUrl } from "../../../config/host";
import { DirectMessagesContext, UserContext } from "../../../context";

export function ConversationOptionsScreen(props) {
  const { currentUser } = useContext(UserContext);
  const { setShouldUpdateConversations } = useContext(DirectMessagesContext);
  const { showOptions, setShowOptions, conversationIdOption } = props;
  const handleDelete = () => {
    try {
      const fetchData = async () => {
        await fetch(
          `${domainUrl}/users/${currentUser.id}/conversations/${conversationIdOption}`,
          {
            method: "DELETE",
          }
        ).then(() => {
          setShouldUpdateConversations(true);
          setShowOptions(false);
        });
      };

      fetchData();
    } catch (error) {
      console.log("error al eliminar");
    }
  };

  return (
    <Modal show={showOptions} close={setShowOptions}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          margin: -15,
          padding: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 5,
            width: "100%",
          }}
        >
          <Icon
            name="pin-outline"
            type="material-community"
            color={color.light.corporate}
          />
          <View style={styles.option}>
            <Text style={styles.textOption}>Fijar convesación</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}
          onPress={handleDelete}
        >
          <Icon
            name="trash-can-outline"
            type="material-community"
            color={color.light.corporate}
          />
          <View style={styles.option}>
            <Text style={styles.textOption}>Eliminar conversación</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
