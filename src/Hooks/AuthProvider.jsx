import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // LOGIN HANDLER
  const login = async (data) => {
    setUser(data.user);
    setToken(data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    console.log("navigating to userPage!");
    if (data.user.active) {
      navigate("/dashboard/user");
    } else {
      navigate("/dashboard/registration");
    }
  };

  // LOGOUT HANDLER
  const logout = () => {
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
    console.log("logging out!");
    navigate("/");
  };

  // USER DATA AND HANDLERS STORED IN CONTEXT
  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
