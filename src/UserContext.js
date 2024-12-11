import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// UserContext Provider Component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Store the user's unique ID

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
