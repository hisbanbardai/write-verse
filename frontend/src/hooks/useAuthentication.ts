import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { handleError } from "../lib/utils";
import { useLocation } from "react-router-dom";

export const useAuthentication = function () {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        handleError(error);
      }
    }

    checkAuthentication();
  }, [location]);

  return {
    isAuthenticated,
  };
};
