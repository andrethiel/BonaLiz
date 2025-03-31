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
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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
  DataCompra: null,
  Inativo: null,
  Arquivo: [],
  Imagem: "",
  Status: "",
};

export function ProdutoProvider({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState(initialFormState);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [Produto, setProduto] = useState();
  const [Fornecedor, setFornecedores] = useState([]);
  const [TipoProduto, setTipoProduto] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      !window.location.href.includes("Criar") ||
      !window.location.href.includes("Editar")
    ) {
      Listar();
    }
  }, []);

  async function Listar() {
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
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 100);

    return () => clearTimeout(timer);
  }, [alert.message]);

  function Reset() {
    setFileURLs([]);
    setForm(initialFormState);
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
        setFileURLs(response.data.urlImagem);
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
        Reset();
        router.back();
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

  async function CriarProduto() {
    try {
      setIsLoading(true);
      form.Inativo = false;
      const response = await CadastrarProduto(form);
      if (response.success) {
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });
        router.back();
        Reset();
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
        CriarProduto,
        handleBlur,
        Voltar,
        isActive,
        setIsActive,
        files,
        setFiles,
        fileURLs,
        setFileURLs,
        show,
        setShow,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
}
