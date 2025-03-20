import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "../layout/AppHeader";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Loader } from "../common/Loader";

export const ProtectedRoutes = function () {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return (
    <>
      <AppHeader />
      {isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} replace />}
    </>
  );
};
