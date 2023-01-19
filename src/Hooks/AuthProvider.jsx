import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [authToken, setAuthToken] = useLocalStorage("authToken",null);
  const navigate = useNavigate();

  // LOGIN HANDLER
  const login = async (data) => {
    setUser(data.user);
    setToken(data.token);
    setAuthToken(data.authToken);
    //axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    //axios.defaults.headers.common['authToken'] = `${data.authToken}`;
    if (data.user.data.active) {
      console.log("navigating to userPage!");
      navigate("/dashboard/user");
    } else {
      console.log("navigating to registration!");
      navigate("/dashboard/registration");
    }
  };

  const getCallConfig = () => {
    return {
      headers:{
        Authorization: `Bearer ${token}`,
        authToken: `${authToken}`
      }
    };
  }

  // LOGOUT HANDLER
  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    delete axios.defaults.headers.common['Authorization'];
    console.log("logging out!");
    navigate("/");
  };

  // USER DATA AND HANDLERS STORED IN CONTEXT
  const value = useMemo(
    () => ({
      token,
      user,
      authToken,
      login,
      logout,
      getCallConfig,
    }),
    [user,token,authToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
