import { ListarProdutosPrincal } from "@/Api/Controllers/Produto";
import { InserirVenda } from "@/Api/Controllers/Vendas";
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
    Status: "",
  });

  async function listar() {
    setIsLoading(true);
    try {
      const response = await ListarProdutosPrincal();
      if (response.length > 0) {
        setProdutos(response);
      } else {
        setProdutos([]);
      }
    } catch (e) {
      setProdutos([]);
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    }
    setIsLoading(false);
  }

  async function Cadastrar(form) {
    try {
      if (Valida(form)) {
        const response = await InserirVenda(form);
        if (response.status) {
          setAlert({
            ...alert,
            type: "Success",
            message: responsJSON.parse(e.request.response).message,
          });
          setIsOpen(false);
          listar();
        } else {
          setAlert({
            ...alert,
            type: "Danger",
            message: responsJSON.parse(e.request.response).message,
          });
        }
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    }
  }

  function Valida(forms) {
    if (forms.ClienteId == "") {
      setAlert({
        ...alert,
        message: "Selecione um cliente",
        type: "Alert",
      });
      return false;
    }
    if (forms.Quantidade == "") {
      setAlert({
        ...alert,
        message: "Digite a quantidade do produto",
        type: "Alert",
      });
      return false;
    }
    if (forms.Status == "") {
      setAlert({
        ...alert,
        message: "Selecione um status de pagamento",
        type: "Alert",
      });
      return false;
    }

    return true;
  }

  return {
    Produtos,
    isLoading,
    alert,
    setAlert,
    setForm,
    form,
    setProdutos,
    setIsLoading,
    listar,
    isOpen,
    setIsOpen,
    Cadastrar,
  };
}
