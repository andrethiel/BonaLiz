import {
  ListarFornecedor,
  PesquisarFornecedor,
} from "@/Api/Controllers/Forncedor";
import { useEffect, useState } from "react";

export function Lista(form) {
  const [isLoading, setIsLoading] = useState(false);
  const [Fornecedores, setFornecedores] = useState();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    listar();
  }, []);

  async function listar() {
    setIsLoading(true);
    try {
      const response = await ListarFornecedor();
      if (response.length > 0) {
        setFornecedores(response);
      }
    } catch (e) {
      setFornecedores([]);
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
    setIsLoading(false);
  }

  async function Pesquisar() {
    setIsLoading(true);
    try {
      const response = await PesquisarFornecedor(form);
      if (response.length > 0) {
        setFornecedores(response);
      } else {
        setFornecedores([]);
        setAlert({
          ...alert,
          type: "Alert",
          message: "Nenhum fornecedor encontrado",
        });
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }

    setIsLoading(false);
  }

  return {
    listar,
    alert,
    Fornecedores,
    isLoading,
    setIsLoading,
    setAlert,
    setFornecedores,
    Pesquisar,
  };
}
