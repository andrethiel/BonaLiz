import {
  CancelarVenda,
  InserirVenda,
  ListarVendas,
  VendasFiltar,
} from "@/Api/Controllers/Vender";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  });

  useEffect(() => {
    Listar();
  }, []);

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
        message: e.message,
      });
      setIsLoading(false);
    }
  }

  async function Cadastrar(form) {
    try {
      const response = await InserirVenda(form);
      if (response.status) {
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });
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
    console.log(id);
    setIsLoading(true);
    const response = await CancelarVenda(id);
    if (response.status) {
      setAlert({
        ...alert,
        type: "Success",
        message: response.message,
      });
    }
    setIsLoading(false);
  }

  setTimeout(() => {
    setAlert({
      ...alert,
      type: "",
      message: "",
    });
  }, [500]);

  return {
    alert,
    setAlert,
    isLoading,
    setIsLoading,
    Cadastrar,
    vendasLista,
    data,
    setData,
    Filtrar,
    form,
    setForm,
    Cancela,
    Listar,
  };
}
