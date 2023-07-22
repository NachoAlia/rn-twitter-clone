import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Icon, Image } from "react-native-elements";
import { styles } from "./Message.styles";
import { UserContext } from "../../../context";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
export function Message(props) {
  const { item } = props;
  const { currentUser } = useContext(UserContext);
  const thema = useThemaContext();

  const messageTimestamp = new Date(item?.created_at).toLocaleTimeString(
    "en-ES",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <View style={styles.container}>
      {item.photoMessage_url && (
        <View
          style={[
            item.user_sender_id === currentUser.id
              ? styles.containerPhotoMessageSender
              : styles.containerPhotoMessageReceiver,
          ]}
        >
          <Image
            source={{ uri: item.photoMessage_url }}
            style={styles.photoMensaje}
          />
        </View>
      )}
      {item.body && (
        <View
          style={
            item.user_sender_id === currentUser.id
              ? styles.currentUserSender
              : [
                  styles.currentUserReceiver,
                  {
                    backgroundColor: thema
                      ? "#FAEBDB"
                      : color.dark.textSecondary,
                  },
                ]
          }
        >
          <Text
            style={[
              item.user_sender_id === currentUser.id
                ? { color: color.dark.text }
                : { color: thema ? color.light.text : color.dark.text },
              { fontSize: 15 },
            ]}
          >
            {item.body}
          </Text>
        </View>
      )}
      <View
        style={[
          item.user_sender_id == currentUser.id
            ? { alignSelf: "flex-end", marginRight: 10 }
            : { alignSelf: "flex-start", marginLeft: 10 },
          {
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={[
            styles.timeText,
            {
              color: thema
                ? color.light.textSecondary
                : color.dark.textSecondary,
            },
          ]}
        >
          {messageTimestamp}
        </Text>
        <Text
          style={{
            color: thema ? color.light.textSecondary : color.dark.textSecondary,
            fontWeight: "bold",
            marginLeft: 5,
          }}
        >
          ·
        </Text>
        {item.user_sender_id == currentUser.id ? (
          <Text
            style={[
              styles.stateText,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            Visto
          </Text>
        ) : (
          <Icon
            type="material-community"
            name="heart-outline"
            size={19}
            style={{ marginLeft: 10 }}
            color={thema ? color.light.textSecondary : color.dark.textSecondary}
          />
        )}
      </View>
    </View>
  );
}
