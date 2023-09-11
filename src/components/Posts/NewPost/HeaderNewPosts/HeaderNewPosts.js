import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { cableConsumer } from "../../../../config/host";
import { styles } from "./HeaderNewPosts.style";
import { Avatar } from "react-native-elements";
import { color } from "../../../../utils";
import { useReloadContext, useReloadPostContext } from "../../../../context";

export function HeaderNewPosts() {
  const [imageUrls, setImageUrls] = useState([]);
  const [visible, setVisible] = useState(false);
  const [reloading, setReloading] = useState(true);

  const reloadPost = useReloadPostContext();
  const reload = useReloadContext();

  useEffect(() => {
    let counter = 0;
    setReloading(false);
    setVisible(false);
    const socket = new WebSocket(cableConsumer);

    socket.onopen = () => {
      const subscriptionParams = {
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "NewPostsChannel",
        }),
      };
      socket.send(JSON.stringify(subscriptionParams));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.message && data.message.type === "new_tweet") {
        counter = counter + 1;
        if (data.message.user) {
          setImageUrls((prevUrls) => [
            ...prevUrls,
            data.message.user.photoProfile_url,
          ]);
        }

        if (counter > 2) {
          setVisible(true);
        }
      }
    };

    socket.onerror = (error) => {
      console.error("Error WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada:");
    };

    return () => {
      socket.close();
    };
  }, [reload]);

  const onRefresh = async () => {
    setReloading(true);
    await reloadPost();
    setImageUrls([]);
  };

  return (
    <>
      {visible ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={onRefresh}>
            <View style={styles.button}>
              {reloading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Avatar
                    source={
                      imageUrls[0]
                        ? { uri: imageUrls[0] }
                        : require("../../../../../assets/icons/default_user_photo.png")
                    }
                    size="small"
                    rounded
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: color.light.alternative,
                    }}
                  />
                  <Avatar
                    source={
                      imageUrls[1]
                        ? { uri: imageUrls[1] }
                        : require("../../../../../assets/icons/default_user_photo.png")
                    }
                    size="small"
                    rounded
                    containerStyle={{
                      marginLeft: -15,
                      borderWidth: 1,
                      borderColor: color.light.alternative,
                    }}
                  />
                  <Avatar
                    source={
                      imageUrls[2]
                        ? { uri: imageUrls[2] }
                        : require("../../../../../assets/icons/default_user_photo.png")
                    }
                    size="small"
                    rounded
                    containerStyle={{
                      marginLeft: -15,
                      borderWidth: 1,
                      borderColor: color.light.alternative,
                    }}
                  />
                  <Text style={styles.text}>Nuevos posteos</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
