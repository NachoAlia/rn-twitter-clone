import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [drawerScreenOptions, setDrawerScreenOptions] = useState(null);

  useEffect(() => {
    setDrawerScreenOptions(null);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        drawerScreenOptions,
        setDrawerScreenOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
