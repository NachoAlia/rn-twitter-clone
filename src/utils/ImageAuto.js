import React, { useState } from "react";
import { Image } from "react-native-elements";

export function ImageAuto({ uri, desiredWidth }) {
  const [autoHeight, setAutoHeight] = useState(0);

  Image.getSize(uri, (width, height) => {
    setAutoHeight((desiredWidth * height) / width);
  });
  return (
    <Image
      source={{ uri: uri }}
      style={{
        width: desiredWidth,
        height: autoHeight,
        borderRadius: 15,
      }}
    />
  );
}
