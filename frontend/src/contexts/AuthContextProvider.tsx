import axios from "axios";
import { BACKEND_URL } from "../config";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext<{
  user: Record<string, string> | null;
  isAuthenticated: boolean | null;
} | null>(null);

export const AuthContextProvider = function ({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<Record<string, string> | null>(null);

  const location = useLocation();

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/validate-token`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        // handleError(error);
      }
    }

    checkAuthentication();
  }, [location]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
