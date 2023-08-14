import React, { createContext, useState } from "react";
export const DirectMessagesContext = createContext();

export const DirectMessagesProvider = ({ children }) => {
  const [shouldUpdateConversations, setShouldUpdateConversations] =
    useState(true);
  const [shouldUpdateMessages, setShouldUpdateMessages] = useState(true);

  return (
    <DirectMessagesContext.Provider
      value={{
        shouldUpdateConversations,
        setShouldUpdateConversations,
        shouldUpdateMessages,
        setShouldUpdateMessages,
      }}
    >
      {children}
    </DirectMessagesContext.Provider>
  );
};
