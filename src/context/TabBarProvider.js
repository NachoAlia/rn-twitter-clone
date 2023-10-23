import React, { createContext, useEffect, useState } from "react";
export const TabBarContext = createContext();

export const TabBarProvider = ({ children }) => {
  const [tabBarScreenOptions, setTabBarScreenOptions] = useState(null);
  const [newNotifications, setNewNotifications] = useState(false);
  useEffect(() => {
    setTabBarScreenOptions(null);
  }, []);

  return (
    <TabBarContext.Provider
      value={{
        tabBarScreenOptions,
        setTabBarScreenOptions,
        newNotifications,
        setNewNotifications,
      }}
    >
      {children}
    </TabBarContext.Provider>
  );
};
