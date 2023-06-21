import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);

  const onLoginSuccess = (data) => {
    setCurrentUser(data.user);
    setCurrentToken(data.token);
  };

  const onLogoutAction = () => {
    setCurrentUser(null);
    setCurrentToken(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, currentToken, onLoginSuccess, onLogoutAction }}
    >
      {children}
    </UserContext.Provider>
  );
};
