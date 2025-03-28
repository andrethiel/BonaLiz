"use client";
import { SelectListForncedor } from "@/Api/Controllers/Forncedor";
import {
  CadastrarProduto,
  EditarProduto,
  FiltrarProdutos,
  ListarProdutos,
  LucroProduto,
  ProdutoPorGuid,
} from "@/Api/Controllers/Produto";
import { SelectListTipoProduto } from "@/Api/Controllers/TipoProduto";
import ImageArquivo from "@/Components/Image";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DragDropContext } from "./DragDrop";

export const ProdutoContext = createContext(null);

const initialFormState = {
  Nome: "",
  Id: 0,
  Guid: null,
  Quantidade: "",
  FornecedorId: "",
  TipoProdutoId: "",
  precoCusto: "",
  precoVenda: "",
  Lucro: "",
  DataCompra: "",
  Inativo: null,
  Arquivo: [],
  Imagem: [],
  Status: "",
  Data: "",
};

export function ProdutoProvider({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState(initialFormState);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  // const [data, setData] = useState({
  //   startDate: null,
  //   endDate: null,
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [Produto, setProduto] = useState();
  const [Fornecedor, setFornecedores] = useState([]);
  const [TipoProduto, setTipoProduto] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          Listar(),
          Fornecedores(),
          TipoProdutos(),
        ]);
      } catch (e) {
        setAlert({
          ...alert,
          type: "Danger",
          message: JSON.parse(e.request.response).message,
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 100);

    return () => clearTimeout(timer);
  }, [alert.message]);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  function Reset() {
    setArquivo([]);
    setForm(initialFormState);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarProdutos();
      if (response.success) {
        setProduto(response.data);
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
      setProduto([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function Fornecedores() {
    const response = await SelectListForncedor();
    setFornecedores(response);
  }
  async function TipoProdutos() {
    const response = await SelectListTipoProduto();
    setTipoProduto(response);
  }

  async function Filtrar() {
    setIsLoading(true);
    try {
      const response = await FiltrarProdutos(form);
      if (response.success) {
        setProduto(response.data);
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

  async function Buscar(guid) {
    try {
      setIsLoading(true);
      const response = await ProdutoPorGuid(guid);
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
          Quantidade: response.data.quantidade,
          FornecedorId: response.data.fornecedorId,
          TipoProdutoId: response.data.tipoProdutoId,
          precoCusto: response.data.precoCusto,
          precoVenda: response.data.precoVenda,
          Lucro: response.data.lucro,
          Imagem: response.data.urlImagem,
          Status: response.data.status,
          DataCompra: response.data.dataCompra,
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

  async function EditaProduto() {
    try {
      setIsLoading(true);
      form.Inativo = checked.toString();
      const response = await EditarProduto(form);
      if (response.success) {
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    } finally {
      Reset();
      setIsLoading(false);
      router.back();
    }
  }

  async function CriarProduto() {
    try {
      setIsLoading(true);
      const response = await CadastrarProduto(form);
      if (response.success) {
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });

        router.back();
      }
    } catch (e) {
      console.log(e);
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    } finally {
      Reset();
      setIsLoading(false);
      router.back();
    }
  }

  const handleBlur = async () => {
    if (form.precoCusto != "" && form.precoVenda != "") {
      setIsLoading(true);
      try {
        const response = await LucroProduto(form);
        setForm({
          ...form,
          Lucro: response,
        });
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
  };

  const handleChange = (e) => {
    if (e?.target) {
      const { value, name } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    } else {
      setForm((previ) => ({
        ...previ,
        DataCompra: dayjs(e).format("DD/MM/YYYY").toString(),
        Data: e,
      }));
    }
  };

  function Voltar() {
    Reset();
    router.back();
  }

  return (
    <ProdutoContext.Provider
      value={{
        form,
        setForm,
        alert,
        setAlert,
        isLoading,
        setIsLoading,
        EditaProduto,
        setChecked,
        checked,
        router,
        Buscar,
        handleChange,
        Filtrar,
        Produto,
        Fornecedor,
        TipoProduto,
        isOpen,
        setIsOpen,
        handleNextMonth,
        handlePrevMonth,
        currentMonth,
        setCurrentMonth,
        CriarProduto,
        handleBlur,
        Voltar,
        isActive,
        setIsActive,
        files,
        setFiles,
        fileURLs,
        setFileURLs,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
}
