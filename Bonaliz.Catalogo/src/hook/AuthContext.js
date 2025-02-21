"use client";
import { CadastrarClienteCatalogo } from "@/Api/Controllers/User";
import { createContext, useContext, useEffect, useState } from "react";
import { UseCarrinho } from "./CarrinhoContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    nome: "",
    telefone: "",
  });
  const [modalLogin, setModalLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { setIsOpen, itensCarrinho, EnviarCarrinhoLogin } = UseCarrinho();

  async function Login() {
    if (Verifica()) {
      const response = await CadastrarClienteCatalogo(user);
      if (response.status) {
        localStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
        setModalLogin(false);
        setIsOpen(false);
        localStorage.setItem("CarrinhoId", response.carrinhoId);
        if (itensCarrinho.length > 0) {
          for (var i = 0; i < itensCarrinho.length; i++) {
            itensCarrinho[i].CarrinhoId = response.carrinhoId;
          }
          EnviarCarrinhoLogin();
        }
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("CarrinhoId");
    setIsAuthenticated(false);
  };

  function Verifica() {
    if (user.nome == "") {
      alert("Digite o seu nome completo.");
      return false;
    }
    if (user.telefone == "") {
      alert("Digite o seu telefone.");
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(
        localStorage.getItem("isAuthenticated") == "true" ? true : false
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        Login,
        logout,
        isAuthenticated,
        modalLogin,
        setModalLogin,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
