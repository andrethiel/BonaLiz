"use client";
import {
  EditarTipoProduto,
  InserirTipoProduto,
  ListarTipoProduto,
  PesquisarTipoProduto,
  TipoProdutoPorGuid,
} from "@/Api/Controllers/TipoProduto";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const TipoProdutoContext = createContext(null);

const initialFormState = {
  Id: 0,
  Guid: null,
  Nome: "",
  Inativo: null,
};

export function TipoProdutoProvider({ children }) {
  const [form, setForm] = useState(initialFormState);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [TipoProduto, setTipoProduto] = useState();
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!window.location.href.includes("Criar" || "Editar")) {
      Listar();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 100);

    return () => clearTimeout(timer);
  }, [alert.message]);

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarTipoProduto();
      if (response.success) {
        setTipoProduto(response.data);
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

  async function Pesquisar() {
    setIsLoading(true);
    try {
      const response = await PesquisarTipoProduto(form);
      if (response.success) {
        setTipoProduto(response.data);
        setForm(initialFormState);
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    } finally {
      setForm({
        Id: 0,
        Guid: null,
        Nome: "",
        Inativo: null,
      });
      setIsLoading(false);
    }
  }

  async function Buscar(guid) {
    setIsLoading(true);
    const response = await TipoProdutoPorGuid(guid);
    try {
      if (response.success) {
        setForm({
          ...form,
          Nome: response.data.nome,
          Id: response.data.id,
          Guid: response.data.guid,
          Inativo:
            response.data.inativo == "True"
              ? setChecked(true)
              : setChecked(false),
        });
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

  async function Editar() {
    try {
      setIsLoading(true);
      form.Inativo = checked.toString();
      const response = await EditarTipoProduto(form);
      if (response.success) {
        setTipoProduto((prev) =>
          prev.map((item) =>
            item.id == response.data.id ? response.data : item
          )
        );
        setAlert({
          ...alert,
          message: response.message,
          type: "Success",
        });
        router.back();
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    } finally {
      setForm({
        Id: 0,
        Guid: null,
        Nome: "",
        Inativo: null,
      });
      setIsLoading(false);
    }
  }

  async function Inserir() {
    try {
      setIsLoading(true);
      const response = await InserirTipoProduto(form);
      if (response.success) {
        setTipoProduto((prev) => [...prev, response.data]);
        setAlert({
          ...alert,
          message: response.message,
          type: "Success",
        });

        router.back();
      } else {
        setAlert({
          ...alert,
          message: JSON.parse(e.request.response).message,
          type: "Danger",
        });
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
    <TipoProdutoContext.Provider
      value={{
        Pesquisar,
        handleChange,
        isLoading,
        TipoProduto,
        alert,
        Buscar,
        Editar,
        form,
        checked,
        setChecked,
        Inserir,
        router,
      }}
    >
      {children}
    </TipoProdutoContext.Provider>
  );
}
