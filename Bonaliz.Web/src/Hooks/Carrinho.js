"use client";
import {
  ListarCarrinhos,
  ListarItensCarrinhos,
} from "@/Api/Controllers/Carrrinho";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";
import { usePathname } from "next/navigation";

export const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const pathname = usePathname();
  const [carrinho, setCarrinho] = useState([]);
  const [isModalCarrinho, setIsModalCarrinho] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const { setIsLoading, alert, setAlert } = useContext(GlobalContext);

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

  async function ListarItensCarrinho(carrinhoId) {
    try {
      setIsLoading(true);
      const response = await ListarItensCarrinhos(carrinhoId);
      if (response.success) {
        setItensCarrinho(response.data);
        setIsModalCarrinho(true);
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

  const total = itensCarrinho.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.valor.replace("R$ ", "").replace(",", ".")) *
        item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        isModalCarrinho,
        setIsModalCarrinho,
        itensCarrinho,
        ListarItensCarrinho,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
