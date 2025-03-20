import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Loader } from "../common/Loader";

export const PublicRoutes = function () {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/blogs"} replace />;
};
