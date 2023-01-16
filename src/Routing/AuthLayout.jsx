import { useOutlet } from "react-router-dom";
import { AuthProvider } from "./Hooks/AuthProvider";

export const AuthLayout = () => {
  const outlet = useOutlet();

  return (
    <AuthProvider>{outlet}</AuthProvider>
  );
};