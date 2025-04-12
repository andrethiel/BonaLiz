"use client";
import {
  CadastrarClienteCatalogo,
  ClienteCatalogo,
} from "@/Api/Controllers/User";
import { createContext, useContext, useEffect, useState } from "react";
import { CarrinhoContext } from "./CarrinhoContext";
import { useClienteCarrinho } from "./useCarrinho";
import { useGlobalState } from "./GlobalContext";
import { loadUserFromStorage } from "@/utils/userStorage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [modalLogin, setModalLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { setIsOpen, setIsLoading } = useContext(CarrinhoContext);

  const { sincronizarComUsuario } = useClienteCarrinho();
  const { user, setUser } = useGlobalState();

  async function Login() {
    try {
      if (Verifica()) {
        setIsLoading(true);
        const response = await CadastrarClienteCatalogo(user);
        if (response.success) {
          localStorage.setItem("isAuthenticated", true);
          setIsAuthenticated(true);
          setModalLogin(false);
          setIsOpen(false);
          localStorage.setItem("CarrinhoId", response.data.carrinhoId);
          localStorage.setItem("telefone", user.telefone);
          localStorage.setItem("nome", user.nome);

          await sincronizarComUsuario(response.data.carrinhoId);

          return true;
        }
      }
    } catch (e) {
      alert(e.message);
      return;
    } finally {
      setIsLoading(false);
      return false;
    }
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("CarrinhoId");
    localStorage.removeItem("telefone");
    localStorage.removeItem("nome");
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

  async function handlerOnBlur() {
    try {
      setIsLoading(true);
      const response = await ClienteCatalogo(user.telefone);
      if (response.data != null) user.nome = response.data.nome;
    } catch (e) {
      alert("Erro ao fazer o login");
      return;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(auth);

      const handleStorage = (event) => {
        if (event.key === "isAuthenticated") {
          setIsAuthenticated(event.newValue === "true");
        }
      };

      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, []);

  useEffect(() => {
    loadUserFromStorage(setUser);
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
        handlerOnBlur,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
