import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/user/getcurrent-user",
        { withCredentials: true }
      );
      setUserData(result.data);
    } catch (error) {
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);


  let value={
    userData,
    setUserData,
    getCurrentUser
  }

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
