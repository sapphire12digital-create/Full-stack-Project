import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ check login on refresh
  useEffect(() => {
    axios
      .get(serverUrl + "/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = {
    serverUrl,
    user,
    isLoggedIn,
    loading,
    setUser,
    setIsLoggedIn
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
