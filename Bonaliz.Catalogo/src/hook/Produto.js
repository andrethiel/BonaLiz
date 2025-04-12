"use client";
import { createContext, useEffect, useState } from "react";
import {
  Filtrar,
  ListarProdutosPrincal,
  SelectListTipoProduto,
} from "../Api/Controllers/Produto";

export const ProdutoContext = createContext();

export function ProdutoProvider({ children }) {
  useEffect(() => {
    ListarTudo();
  }, []);

  async function ListarTudo() {
    try {
      const [res1, res2] = await Promise.all([SelectList(), Listar()]);
    } catch (e) {
      alert(e.request.response);
    }
  }

  const [tipoProduto, setTipoProduto] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectTipoProduto, setSelectTipoProduto] = useState([]);

  async function Listar() {
    try {
      const response = await ListarProdutosPrincal();
      if (response.success) {
        setProdutos(response.data);
      } else {
        setProdutos([]);
      }
    } catch (e) {
      setProdutos([]);
      alert(e.message);
    }
  }

  async function SelectList() {
    try {
      const response = await SelectListTipoProduto();
      console.log(response);
      if (response.success) {
        setSelectTipoProduto(response.data);
      }
    } catch (e) {
      setSelectTipoProduto([]);
      alert(e.message);
    }
  }

  useEffect(() => {
    const filtrarProdutos = async () => {
      if (tipoProduto.length > 0) {
        try {
          const response = await Filtrar(JSON.stringify(tipoProduto));
          if (response.success) {
            setProdutos(response.data);
          }
        } catch (e) {
          setSelectTipoProduto([]);
          alert(e.message);
        }
      } else {
        Listar();
      }
    };

    filtrarProdutos();
  }, [tipoProduto]);

  async function FiltrarProdutos(id) {
    setTipoProduto((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item != id);
      } else {
        return [...prev, id];
      }
    });
  }

  return (
    <ProdutoContext.Provider
      value={{
        produtos,
        Listar,
        SelectList,
        selectTipoProduto,
        FiltrarProdutos,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
}
