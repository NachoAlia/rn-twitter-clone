import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./Message.styles";
import { UserContext } from "../../../context";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
export function Message(props) {
  const { item } = props;
  const { currentUser } = useContext(UserContext);
  const thema = useThemaContext();
  const ItemTimeToStringPretty =
    item.time.slice(0, 5) + " " + item.time.slice(8, 14);
  return (
    <View style={styles.container}>
      <View
        style={
          item.sender_id === currentUser.id
            ? styles.currentUserSender
            : [
                styles.currentUserReceiver,
                {
                  backgroundColor: thema ? "#FAEBDB" : color.dark.textSecondary,
                },
              ]
        }
      >
        <Text
          style={[
            item.sender_id === currentUser.id
              ? { color: color.dark.text }
              : { color: thema ? color.light.text : color.dark.text },
            { fontSize: 15 },
          ]}
        >
          {item.body}
        </Text>
      </View>
      <View
        style={[
          item.sender_id == currentUser.id
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
          {ItemTimeToStringPretty}
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
        {item.sender_id == currentUser.id ? (
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
