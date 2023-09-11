import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";
import { useThemaContext } from "../../../ThemeProvider";
import { domainUrl } from "../../../../config/host";
import { styles } from "./DeletePostModal.style";
import { color } from "../../../../utils";

export function DeletepostModal({ visible, onBackdropPress, dataPost }) {
  const thema = useThemaContext();

  const deletePost = async () => {
    const route = `/tweets/${dataPost.id}`;
    const apiUrl = `${domainUrl}${route}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
    });
    if (response.ok) {
      onBackdropPress();
    }
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={[
        styles.container,
        {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <View styles={styles.containerMessage}>
        <Text
          style={[
            styles.titleText,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          ¿Deseas eliminar post?
        </Text>
        <Text
          style={[
            styles.text,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          Esta acción no se puede revertir, y se eliminará de tu perfil, de la
          cronología de las cuentas que te sigan y de los resultados de
          búsqueda.
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={deletePost}>
          <Text style={{ color: thema ? color.light.text : color.dark.text }}>
            Eliminar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onBackdropPress}>
          <Text style={{ color: thema ? color.light.text : color.dark.text }}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
}
