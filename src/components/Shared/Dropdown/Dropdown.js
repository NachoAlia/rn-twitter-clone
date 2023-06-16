import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon, Overlay, Button } from "react-native-elements";
import { styles } from "./Dropdown.styles";

export function Dropdown(props) {
  const {
    links,
    containerStyle,
    iconName,
    iconContainer,
    overlayStyle,
    linkTitleStyle,
    iconColor,
  } = props;
  const [isOverlayOpen, setIsOverlayOpen] = useState(null);
  return (
    <View style={containerStyle}>
      <Icon
        type="material-community"
        name={iconName}
        size={22}
        color={iconColor}
        onPress={() => setIsOverlayOpen(true)}
        containerStyle={iconContainer}
      />
      <Overlay
        isVisible={isOverlayOpen}
        onBackdropPress={() => setIsOverlayOpen(false)}
        overlayStyle={overlayStyle}
        backdropStyle={styles.backdrop}
      >
        {links.map((link, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsOverlayOpen(false);
                link.action();
              }}
              key={index}
            >
              <Text style={linkTitleStyle}>{link.name}</Text>
            </TouchableOpacity>
          );
        })}
      </Overlay>
    </View>
  );
}
