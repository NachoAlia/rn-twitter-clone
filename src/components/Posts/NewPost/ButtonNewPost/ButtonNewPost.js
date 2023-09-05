import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ButtonNewPost.style";
import { color } from "../../../../utils";
import { Modal } from "../../../Shared";
import { NewPostScreen } from "../../../../screens/Post/NewPostScreen";
import { useThemaContext } from "../../../ThemeProvider";

export function ButtonNewPost() {
  const [showModal, setShowModal] = useState(false);

  const thema = useThemaContext();

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const gotoNewPost = () => {
    setShowModal((prevState) => !prevState);
  };
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={gotoNewPost}>
        <Image
          source={require("../../../../../assets/icons/ui/new_post.png")}
          containerStyle={styles.imagenIcon}
        />
      </TouchableOpacity>
      <Modal
        fullScreen={true}
        show={showModal}
        close={onCloseOpenModal}
        style={{
          flex: 1,
          width: "100%",
          borderRadius: 0,
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        }}
      >
        <NewPostScreen close={onCloseOpenModal} />
      </Modal>
    </>
  );
}
