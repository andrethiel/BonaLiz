"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Linked from "@/Components/Link";
import Select from "@/Components/Select";
import { ProdutoContext } from "@/Hooks/Produto";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

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
  const {
    isLoading,
    alert,
    form,
    handleChange,
    Filtrar,
    Produto,
    Fornecedor,
    TipoProduto,
    isOpen,
    setIsOpen,
    currentMonth,
    setCurrentMonth,
    handlePrevMonth,
    handleNextMonth,
  } = useContext(ProdutoContext);

  const [columnsDef, setColumnsDef] = useState([
    {
      headerName: "Código",
      field: "id",
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
            icon={"tag"}
            placeholder="Nome do Produto"
            onChange={handleChange}
            name={"Nome"}
            id={"Nome"}
          />
        </div>
        <div>
          <Select
            icon={"tag"}
            placeholder="Selecione um fornecedor"
            onChange={handleChange}
            data={Fornecedor}
            value={form.FornecedorId}
            name={"FornecedorId"}
          />
        </div>
        <div>
          <Select
            icon={"tag"}
            placeholder="Selecione um tipo de produto"
            onChange={handleChange}
            data={TipoProduto}
            value={form.TipoProdutoId}
            name={"TipoProdutoId"}
          />
        </div>
        <DataPicker
          onChange={handleChange}
          valueInput={form.DataCompra}
          value={form.Data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          icon={"calendar"}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
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
