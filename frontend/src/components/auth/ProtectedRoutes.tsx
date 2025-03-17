import { Outlet } from "react-router-dom";
import { AppHeader } from "../layout/AppHeader";

export const ProtectedRoutes = function () {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
