"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Select2 from "@/Components/Select2";
import { SelectListProdutos } from "@/Hooks/ProdutosSelect";
import { VendasHook } from "@/Hooks/Venda";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsTag } from "react-icons/bs";

function Vendas() {
  const {
    alert,
    isLoading,
    vendasLista,
    data,
    setData,
    Filtrar,
    form,
    setForm,
    Cancela,
    Listar,
  } = VendasHook();

  const CustomButtonComponent = (props) => {
    const router = useRouter();
    return (
      <button
        className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={() => {
          Cancela(props.data.id);
          Listar();
        }}
      >
        Cancelar Venda
      </button>
    );
  };

  const { selectProdutos } = SelectListProdutos();
  const [columnsDef, setColumnsDef] = useState([
    {
      headerName: "Nome do produto",
      field: "nomeProduto",
    },
    {
      headerName: "Nome do cliente",
      field: "nomeCliente",
    },
    {
      headerName: "Quantidade",
      field: "quantidade",
      maxWidth: 100,
    },
    {
      headerName: "Valor",
      field: "valor",
      maxWidth: 110,
    },
    {
      headerName: "Data da venda",
      field: "dataVenda",
      maxWidth: 120,
    },
    {
      headerName: "Cancelada",
      field: "cancelada",
      valueFormatter: (p) => (p.value.toString() == "True" ? "Cancelada" : ""),
      maxWidth: 120,
    },
    {
      field: "",
      cellRenderer: CustomButtonComponent,
    },
  ]);

  return (
    <div>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className={`flex flex-col my-6 ${isLoading && "hidden"}`}>
        <div className="p-3 m-3">
          <h3 className="text-2xl font-semibold">Lista de Vendas</h3>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 pb-4">
          <Input
            placeholder={"Nome do cliente"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
            onChange={(e) => setForm({ ...form, NomeCliente: e.target.value })}
          />
          {selectProdutos && (
            <Select2
              data={selectProdutos}
              placeholder={"Selecione um Produto"}
              onChange={(e) =>
                setForm({ ...form, ProdutoId: e.value.toString() })
              }
            />
          )}
          <DataPicker
            onChange={(newValue) => {
              setData(newValue);
            }}
            value={data}
            placeholder="Selecione uma data"
          />

          <Button color={"primary"} onClick={Filtrar}>
            Pesquisar
          </Button>
        </div>
        <div>
          <AgGrid Data={vendasLista} Columns={columnsDef} />
        </div>
      </div>
    </div>
  );
}

export default Vendas;
