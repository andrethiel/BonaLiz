"use client";
import {
  CancelarVenda,
  InserirVenda,
  ListarVendas,
  StatusVenda,
  VendasFiltar,
} from "@/Api/Controllers/Vender";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const VendasContext = createContext(null);

const initialFormState = {
  Id: 0,
  Guid: null,
  NomeCliente: "",
  ProdutoId: "",
  DataVenda: "",
  Status: "",
  VendaId: "",
};

export function VendasProvider({ children }) {
  const [form, setForm] = useState(initialFormState);
  const [IsOpen, setIsOpen] = useState(false);
  const [vendasLista, setVendasLista] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/pages/Adm/Vendas") {
      Listar();
    }
  }, []);

  async function Listar() {
    try {
      setIsLoading(true);
      const response = await ListarVendas();
      if (response.success) {
        setVendasLista(response.data);
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

  async function Filtrar() {
    try {
      setIsLoading(true);
      const response = await VendasFiltar(form);
      if (response.success) {
        setVendasLista(response.data);
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

  function handleCloseModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    console.log(e);
    if (e?.target) {
      const { value, name } = e.target;
      if (name == "DataVenda") {
        setForm({
          ...form,
          [name]: dayjs(value).format("DD/MM/YYYY").toString(),
        });
      } else {
        setForm({
          ...form,
          [name]: value,
        });
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [e?.name]: e?.value || "", // Substitua "campo_do_select" pelo nome correto
      }));
    }
  };

  async function Cancela(id) {
    try {
      setIsLoading(true);
      const response = await CancelarVenda(id);
      if (response.success) {
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });
        setVendasLista((prev) =>
          prev.map((item) =>
            item.id == response.data.id ? response.data : item
          )
        );
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

  async function Status(id, status) {
    try {
      if (status == "") {
        setAlert({
          ...alert,
          type: "Alert",
          message: "Selecione um status de pagamento",
        });
      } else {
        setIsLoading(true);
        const response = await StatusVenda(id, status);
        if (response.success) {
          setAlert({
            ...alert,
            type: "Success",
            message: response.message,
          });
          setVendasLista((prev) =>
            prev.map((item) =>
              item.id == response.data.id ? response.data : item
            )
          );
          setIsOpen(false);
        }
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

  return (
    <VendasContext.Provider
      value={{
        alert,
        isLoading,
        vendasLista,
        Filtrar,
        form,
        setForm,
        Cancela,
        Listar,
        IsOpen,
        setIsOpen,
        Status,
        handleCloseModal,
        handleChange,
        show,
        setShow,
      }}
    >
      {children}
    </VendasContext.Provider>
  );
}
