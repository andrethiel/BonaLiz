import { useEffect, useState } from "react";
import {
  Filtrar,
  ListarProdutosPrincal,
  SelectListTipoProduto,
} from "../Api/Controllers/Produto";

export function Principal() {
  const [produtos, setProdutos] = useState([]);
  const [selectTipoProduto, setSelectTipoProduto] = useState();

  async function Listar() {
    try {
      const response = await ListarProdutosPrincal();
      if (response.length > 0) {
        setProdutos(response);
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
      if (response.length > 0) {
        setSelectTipoProduto(response);
      }
    } catch (e) {
      setSelectTipoProduto([]);
      alert(e.message);
    }
  }

  async function FiltrarProdutos(params) {
    try {
      const response = await Filtrar(params);
      if (response.length > 0) {
        setProdutos(response);
      }
    } catch (e) {
      setSelectTipoProduto([]);
      alert(e.message);
    }
  }

  return {
    produtos,
    Listar,
    SelectList,
    selectTipoProduto,
    FiltrarProdutos,
  };
}
