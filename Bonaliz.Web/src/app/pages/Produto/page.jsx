"use client";

import { SelectListForncedor } from "@/Api/Controllers/Forncedor";
import { FiltrarProdutos, ListarProdutos } from "@/Api/Controllers/Produto";
import { SelectListTipoProduto } from "@/Api/Controllers/TipoProduto";

import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Linked from "@/Components/Link";
import Select from "@/Components/Select";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsTag } from "react-icons/bs";

const CustomButtonComponent = (props) => {
  const router = useRouter();
  return (
    <button
      className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={() => router.push("Produto/Editar?Guid=" + props.data.guid)}
    >
      Editar/Excluir
    </button>
  );
};

const Produto = () => {
  useEffect(() => {
    Listar();
  }, []);

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarProdutos();
      if (response.length > 0) {
        setProduto(response);
        Fornecedores();
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
    setIsLoading(false);
    setAlert({
      ...alert,
      type: "",
      message: "",
    });
  }

  async function Fornecedores() {
    const response = await SelectListForncedor();
    if (response.length > 0) {
      setFornecedores(response);
      TipoProdutos();
    }
  }
  async function TipoProdutos() {
    const response = await SelectListTipoProduto();
    if (response.length > 0) {
      setTipoProduto(response);
    }
  }

  async function Filtrar() {
    form.DataCompra =
      data.startDate != null ? dayjs(data.startDate).format("DD/MM/YYYY") : "";
    setIsLoading(true);
    try {
      const response = await FiltrarProdutos(form);
      if (response.length > 0) {
        setProduto(response);
      } else {
        setProduto([]);
        setAlert({
          ...alert,
          type: "Alert",
          message: "Nenhum produto encontrado",
        });
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
    setIsLoading(false);
    setTimeout(() => {
      setAlert({
        ...alert,
        type: "",
        message: "",
      });
    }, 1500);
  }

  const [form, setForm] = useState({
    Nome: "",
    FornecedorId: "",
    TipoProdutoId: "",
    DataCompra: "",
  });
  const [data, setData] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [Produto, setProduto] = useState();
  const [Fornecedor, setFornecedores] = useState([]);
  const [TipoProduto, setTipoProduto] = useState([]);
  const [columnsDef, setColumnsDef] = useState([
    {
      headerName: "Código",
      field: "codigo",
      maxWidth: 90,
    },
    {
      headerName: "Nome do produto",
      field: "nome",
    },
    {
      headerName: "Quantidade",
      field: "quantidade",
      maxWidth: 70,
    },
    {
      headerName: "Nome do fornecedor",
      field: "nomeFornecedor",
    },
    {
      headerName: "Tipo do produto",
      field: "tipoProduto",
    },
    {
      headerName: "Preço de custo",
      field: "precoCusto",
      maxWidth: 110,
    },
    {
      headerName: "Preço de venda",
      field: "precoVenda",
      maxWidth: 110,
    },
    {
      headerName: "Lucro",
      field: "lucro",
      maxWidth: 110,
    },
    {
      headerName: "Data da compra",
      field: "dataCompra",
      maxWidth: 120,
    },
    {
      headerName: "Inativo",
      field: "inativo",
      valueFormatter: (p) =>
        p.value.toString() == "True" ? "Inativo" : "Ativo",
      maxWidth: 90,
    },
    {
      field: "",
      cellRenderer: CustomButtonComponent,
    },
  ]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  if (isLoading) return <CustomLoading loadingMessage="Aguarde..." />;

  return (
    <div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Lista de Produtos</h3>
      </div>
      <div className="grid grid-col-1 lg:grid-cols-5 gap-2">
        <div>
          <Input
            icon={<BsTag />}
            placeholder="Nome do Produto"
            onChange={handleChange}
            value={form.Nome}
            name={"Nome"}
          />
        </div>
        <div>
          <Select
            icon={<BsTag />}
            placeholder="Selecione um fornecedor"
            onChange={handleChange}
            data={Fornecedor}
            value={form.FornecedorId}
            name={"FornecedorId"}
          />
        </div>
        <div>
          <Select
            icon={<BsTag />}
            placeholder="Selecione um tipo de produto"
            onChange={handleChange}
            data={TipoProduto}
            value={form.TipoProdutoId}
            name={"TipoProdutoId"}
          />
        </div>
        <div>
          <DataPicker
            onChange={(newValue) => {
              setData(newValue);
            }}
            value={data}
            placeholder="Selecione uma data"
          />
        </div>
        <div>
          <Button children={"Pesquisar"} color={"primary"} onClick={Filtrar} />
        </div>
      </div>
      <div className="mb-5 flex justify-end">
        <Linked href={"Produto/Criar"}>Criar Produto</Linked>
      </div>
      <div>
        <AgGrid Data={Produto} Columns={columnsDef} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Produto;
