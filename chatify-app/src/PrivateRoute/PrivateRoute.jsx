import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots"></span>
      </div>
    );
  }
  if (user) {
    return <>{children}</>;
  }
  return <Navigate to="/auth" replace={false} />;
};
export default PrivateRoute;
