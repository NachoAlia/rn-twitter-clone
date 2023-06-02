import React, { useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const themaContext = React.createContext();
export const changeThemeContext = React.createContext();

export function useThemaContext() {
  return useContext(themaContext);
}
export function useChangeThemeContext() {
  return useContext(changeThemeContext);
}

export function ThemaProvider(props) {
  const [themaMode, setThemaMode] = useState(true);

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme == "dark") {
      setThemaMode(false);
    }
  }, []);

  const onChangeMode = () => {
    if (themaMode == true) {
      setThemaMode(false);
    } else {
      setThemaMode(true);
    }
  };

  return (
    <themaContext.Provider value={themaMode}>
      <changeThemeContext.Provider value={onChangeMode}>
        {props.children}
      </changeThemeContext.Provider>
    </themaContext.Provider>
  );
}
