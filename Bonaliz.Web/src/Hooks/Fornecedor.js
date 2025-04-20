"use client";
import {
  EditarFornecedor,
  InserirFornecedor,
  ListarFornecedor,
  ObterFornecedorGuid,
  PesquisarFornecedor,
} from "@/Api/Controllers/Forncedor";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";

export const FornecedorContext = createContext(null);

const initialFormState = {
  Id: 0,
  Guid: null,
  Nome: "",
  CNPJ: "",
  Estado: "",
  Inativo: null,
};

export function FornecedorProvider({ children }) {
  const [form, setForm] = useState(initialFormState);
  const [Fornecedores, setFornecedores] = useState();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { setIsLoading, alert, setAlert } = useContext(GlobalContext);

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarFornecedor();
      if (response.success) {
        setFornecedores(response.data);
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

  async function BuscarFornecedor(guid) {
    setIsLoading(true);
    try {
      const response = await ObterFornecedorGuid(guid);
      if (response.success) {
        setForm({
          ...form,
          CNPJ: response.data.cnpj,
          Nome: response.data.nome,
          Estado: response.data.estado,
          Guid: response.data.guid,
          Id: response.data.id,
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

  async function Pesquisar() {
    setIsLoading(true);
    try {
      const response = await PesquisarFornecedor(form);
      if (response.success) {
        setFornecedores(response.data);
        setForm(initialFormState);
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
        setAlert({
          ...alert,
          message: JSON.parse(e.request.response).message,
          type: "Danger",
        });
      } else {
        setFornecedores((prev) => [...prev, response.data]);
        setAlert({
          ...alert,
          message: response.message,
          type: "Success",
        });
        Voltar();
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

        Voltar();
      } else {
        setAlert({
          ...alert,
          type: "Danger",
          message: JSON.parse(e.request.response).message,
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

  function Voltar() {
    setForm(initialFormState);
    router.back();
  }

  return (
    <FornecedorContext.Provider
      value={{
        Listar,
        Fornecedores,
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
        router,
        Voltar,
        Listar,
      }}
    >
      {children}
    </FornecedorContext.Provider>
  );
}
