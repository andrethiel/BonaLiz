"use client";
import {
  EditarFornecedor,
  InserirFornecedor,
  ListarFornecedor,
  ObterFornecedorGuid,
  PesquisarFornecedor,
} from "@/Api/Controllers/Forncedor";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const FornecedorContext = createContext(null);

export function FornecedorProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [Fornecedores, setFornecedores] = useState();
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const router = useRouter();

  const [form, setForm] = useState({
    Id: 0,
    Guid: "",
    Nome: "",
    CNPJ: "",
    Estado: "",
    Iniciais: "",
    Inativo: "",
  });

  useEffect(() => {
    console.log(window.location.href);
    if (!window.location.href.includes("Criar" || "Editar")) {
      listar();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 100);

    return () => clearTimeout(timer);
  }, [alert.message]);

  async function listar() {
    setIsLoading(true);
    try {
      const response = await ListarFornecedor();
      if (response.length > 0) {
        setFornecedores(response);
      }
    } catch (e) {
      console.log(e);
      setFornecedores([]);
      if (e.response == "Network Error") {
        setAlert({
          ...alert,
          type: "Danger",
          message: e.message,
        });
      }
      setAlert({
        ...alert,
        type: "Danger",
        message: "Usuário não autorizado/Caminho não encontrado",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function BuscarFornecedor(guid) {
    setIsLoading(true);
    try {
      const response = await ObterFornecedorGuid(guid);
      if (response.id != 0) {
        setForm({
          ...form,
          CNPJ: response.cnpj,
          Nome: response.nome,
          Estado: response.estado,
          Guid: response.guid,
          Id: response.id,
          Inativo:
            response.inativo == "True" ? setChecked(true) : setChecked(false),
        });
      } else {
        setAlert({
          ...alert,
          type: "Danger",
          message: "Fornecedor não encontrado",
        });
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    } finally {
      setIsLoading(false);
    }
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
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function CriarFornecedor() {
    try {
      setIsLoading(true);
      const response = await InserirFornecedor(form);
      if (!response.success) {
        setAlert({ ...alert, message: response.message, type: "Danger" });
      } else {
        setFornecedores((prev) => [...prev, response.data]);
        setAlert({ ...alert, message: response.message, type: "Success" });
        router.back();
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
      setForm({
        Nome: "",
        CNPJ: "",
        Estado: "",
        Iniciais: "",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function Editar() {
    try {
      setIsLoading(true);
      form.Inativo = checked.toString();
      const response = await EditarFornecedor(form);

      if (response.success) {
        setFornecedores((prev) =>
          prev.map((item) =>
            item.id == response.data.id ? response.data : item
          )
        );
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });

        router.back();
      } else {
        setAlert({
          ...alert,
          type: "Danger",
          message: response.message,
        });
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FornecedorContext.Provider
      value={{
        listar,
        alert,
        Fornecedores,
        isLoading,
        setIsLoading,
        setAlert,
        setFornecedores,
        Pesquisar,
        form,
        setForm,
        handleChange,
        CriarFornecedor,
        Editar,
        BuscarFornecedor,
        checked,
        setChecked,
      }}
    >
      {children}
    </FornecedorContext.Provider>
  );
}
