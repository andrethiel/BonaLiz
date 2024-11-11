import { ListarProdutos } from "@/Api/Controllers/Produto";
import { useEffect, useState } from "react";

export function PrincipalHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [Produtos, setProdutos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [form, setForm] = useState({
    ClienteId: "",
    ProdutoId: "",
    Quantidade: "",
    Nome: "",
    FornecedorId: "",
  });

  useEffect(() => {
    listar();
  }, []);

  async function listar() {
    setIsLoading(true);
    try {
      const response = await ListarProdutos();
      if (response.length > 0) {
        setProdutos(response);
      }
    } catch (e) {
      setProdutos([]);
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
    setIsLoading(false);
  }

  return {
    Produtos,
    isLoading,
    alert,
    setForm,
    form,
    setProdutos,
    setIsLoading,
    listar,
    isOpen,
    setIsOpen,
  };
}
