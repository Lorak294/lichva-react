import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // LOGIN HANDLER
  const login = async (data) => {
    setUser(data);
    console.log("navigating to userPage!");
    // if(data. HAS FILLED INFO){
    //   navigate("/dashboard/user");
    // }else{
    //   navigate("/dashboard/registration");
    // }
    navigate("/dashboard/registration");
  };

  // LOGOUT HANDLER
  const logout = () => {
    setUser(null);
    console.log("logging out!");
    navigate("/");
  };

  // USER DATA AND HANDLERS STORED IN CONTEXT
  const value = useMemo(
    () => ({
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
