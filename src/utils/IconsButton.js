import React, { useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

export function IconsButton({
  name,
  size = 20,
  active = false,
  onPress,
  touchable = true,
}) {
  const [isOnPress, setIsOnPress] = useState(false);

  const urlBase = require.context("../../assets/icons/ui", true);

  const buttonOnPressIn = () => {
    setIsOnPress(true);
  };
  const buttonOnPressOut = () => {
    setIsOnPress(false);
  };

  return (
    <>
      {touchable ? (
        <TouchableWithoutFeedback
          onPressIn={buttonOnPressIn}
          onPressOut={buttonOnPressOut}
          onPress={onPress}
        >
          <Image
            source={
              active
                ? urlBase(`./${name}_active.png`)
                : isOnPress
                ? urlBase(`./${name}_press.png`)
                : urlBase(`./${name}.png`)
            }
            style={{ height: size, width: size }}
          />
        </TouchableWithoutFeedback>
      ) : (
        <Image
          source={
            active
              ? urlBase(`./${name}_active.png`)
              : isOnPress
              ? urlBase(`./${name}_press.png`)
              : urlBase(`./${name}.png`)
          }
          style={{ height: size, width: size }}
        />
      )}
    </>
  );
}
