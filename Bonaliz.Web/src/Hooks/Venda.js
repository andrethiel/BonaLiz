import {
  CancelarVenda,
  InserirVenda,
  ListarVendas,
  StatusVenda,
  VendasFiltar,
} from "@/Api/Controllers/Vender";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrincipalHook } from "./Principal";

export function VendasHook() {
  const [vendasLista, setVendasLista] = useState([]);
  const [data, setData] = useState({
    startDate: null,
    endDate: null,
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    NomeCliente: "",
    ProdutoId: "",
    DataVenda: "",
    Status: "",
    VendaId: "",
  });

  const [IsOpen, setIsOpen] = useState(false);

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarVendas();
      if (response.length > 0) {
        setVendasLista(response);
      } else {
        setAlert({
          ...alert,
          type: "Danger",
          message: "Nenhum produto encontrado",
        });
      }
      setIsLoading(false);
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
      setIsLoading(false);
    }
  }

  async function Filtrar() {
    setIsLoading(true);
    form.DataVenda =
      data.startDate != null ? dayjs(data.startDate).format("DD/MM/YYYY") : "";
    const response = await VendasFiltar(form);
    if (response.length > 0) {
      setVendasLista(response);
    } else {
      setVendasLista([]);
      setAlert({
        ...alert,
        type: "Alert",
        message: "Nenhuma venda encontrado",
      });
    }
    setIsLoading(false);
  }

  async function Cancela(id) {
    setIsLoading(true);
    const response = await CancelarVenda(id);
    if (response.status) {
      setAlert({
        ...alert,
        type: "Success",
        message: responsJSON.parse(e.request.response).message,
      });
    }
    setIsLoading(false);
  }

  async function Status(id, status) {
    if (status == "") {
      setAlert({
        ...alert,
        type: "Alert",
        message: "Selecione um status de pagamento",
      });
    } else {
      setIsLoading(true);
      const response = await StatusVenda(id, status);
      if (response.status) {
        setAlert({
          ...alert,
          type: "Success",
          message: responsJSON.parse(e.request.response).message,
        });
        Listar();
      }
      setIsOpen(false);
      setIsLoading(false);
    }
  }

  return {
    alert,
    setAlert,
    isLoading,
    setIsLoading,
    vendasLista,
    data,
    setData,
    Filtrar,
    form,
    setForm,
    Cancela,
    Listar,
    IsOpen,
    setIsOpen,
    Status,
  };
}
