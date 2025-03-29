import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

export const useAuthentication = function () {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
