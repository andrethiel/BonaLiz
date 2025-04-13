"use client";
import {
  ClienteFiltrar,
  EditarCliente,
  InserirCliente,
  ListarClientes,
  ObterClienteGuid,
} from "@/Api/Controllers/Cliente";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const ClientesContext = createContext(null);

const initialFormState = {
  Id: 0,
  Guid: null,
  Nome: "",
  Email: "",
  Telefone: "",
  Inativo: null,
};

export function ClientesProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [form, setForm] = useState(initialFormState);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pathname === "/pages/Adm/Clientes") {
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
    try {
      setIsLoading(true);
      const response = await ListarClientes();
      if (response.success) {
        setClientes(response.data);
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
    try {
      setIsLoading(true);
      const response = await ClienteFiltrar(form);
      if (response.success) {
        setClientes(response.data);
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

  async function CriarCliente() {
    try {
      setIsLoading(true);
      const response = await InserirCliente(form);
      if (response.success) {
        setClientes((prev) => [...prev, response.data]);
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });
        Voltar();
      }
    } catch (e) {
      console.log(e);
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function Buscar(guid) {
    try {
      setIsLoading(true);
      const response = await ObterClienteGuid(guid);
      if (response.success) {
        setForm({
          ...form,
          Nome: response.data.nome,
          Email: response.data.email,
          Telefone: response.data.telefone,
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

  async function ClienteEditar() {
    try {
      setIsLoading(true);
      form.Inativo = checked.toString();
      const response = await EditarCliente(form);
      if (response.success) {
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });
        setClientes((prev) =>
          prev.map((item) =>
            item.id == response.data.id ? response.data : item
          )
        );
        Voltar();
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

  function Voltar() {
    setForm(initialFormState);
    router.back();
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        isLoading,
        alert,
        setForm,
        form,
        Pesquisar,
        handleChange,
        router,
        CriarCliente,
        Voltar,
        checked,
        setChecked,
        ClienteEditar,
        Buscar,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
}
