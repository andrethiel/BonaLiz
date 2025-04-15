"use client";
import { ListarCarrinhos } from "@/Api/Controllers/Carrrinho";
import { createContext, useEffect, useState } from "react";
import { GlobalState } from "./GlobalState";
import { usePathname } from "next/navigation";

export const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const pathname = usePathname();
  const [carrinho, setCarrinho] = useState([]);
  const { setAlert, setIsLoading, alert } = GlobalState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 100);

    return () => clearTimeout(timer);
  }, [alert.message]);

  useEffect(() => {
    if (pathname === "/pages/Adm/Carrinho") {
      Listar();
    }
  }, []);

  async function Listar() {
    try {
      setIsLoading(true);
      const response = await ListarCarrinhos();
      if (response.success) {
        setCarrinho(response.data);
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
