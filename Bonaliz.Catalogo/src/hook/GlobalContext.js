"use client";
import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

const initialDefault = {
  nome: "",
  telefone: "",
};

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(initialDefault);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <GlobalStateContext.Provider
      value={{ user, setUser, initialDefault, isLoading, setIsLoading }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalState deve ser usado dentro de GlobalStateProvider"
    );
  }
  return context;
};
