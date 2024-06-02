import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
}: React.PropsWithChildren<object>) {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
