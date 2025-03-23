import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "../layout/AppHeader";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Loader } from "../common/Loader";

export const ProtectedRoutes = function () {
  const { isAuthenticated, user } = useAuthentication();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  let authorNameInitials = "";

  if (user) {
    authorNameInitials =
      user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
  }

  return (
    <>
      <AppHeader authorNameInitials={authorNameInitials} />
      {isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} replace />}
    </>
  );
};
