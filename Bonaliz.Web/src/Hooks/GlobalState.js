"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "./Alert";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const { alert, setAlert } = useAlert();

  const [isLoading, setIsLoading] = useState(false);

  const [tenant, setTenant] = useState(() => {
    if (typeof window !== "undefined") {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("tenant="));
      return cookie ? cookie.split("=")[1] : null;
    }
  });

  return (
    <GlobalContext.Provider
      value={{ alert, setAlert, isLoading, setIsLoading, tenant }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
