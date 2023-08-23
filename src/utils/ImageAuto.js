import React, { useState } from "react";
import { Image } from "react-native-elements";
import { color } from "./color";

export function ImageAuto({ uri, desiredWidth, radius = true, border = 0.5 }) {
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
        borderRadius: radius ? 15 : 0,
        borderWidth: border,
        borderColor: color.light.alternative,
      }}
    />
  );
}
