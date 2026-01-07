import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ Skip auth check on public pages
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await axios.get(
          serverUrl + "/api/auth/me",
          { withCredentials: true }
        );

        setUser(res.data);
        setIsLoggedIn(true);
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  const value = {
    serverUrl,
    user,
    isLoggedIn,
    loading,
    setUser,
    setIsLoggedIn,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
