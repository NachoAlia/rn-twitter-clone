import React, { createContext, useEffect, useState } from "react";
export const TabBarContext = createContext();

export const TabBarProvider = ({ children }) => {
  const [tabBarScreenOptions, setTabBarScreenOptions] = useState(null);

  useEffect(() => {
    setTabBarScreenOptions(null);
  }, []);

  return (
    <TabBarContext.Provider
      value={{
        tabBarScreenOptions,
        setTabBarScreenOptions,
      }}
    >
      {children}
    </TabBarContext.Provider>
  );
};
