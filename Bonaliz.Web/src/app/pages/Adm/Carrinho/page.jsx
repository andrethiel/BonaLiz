"use client";
import AgGrid from "@/Components/Grid";
import { CarrinhoContext } from "@/Hooks/Carrinho";
import React, { useContext, useState } from "react";

const CustomButtonLista = (props) => {
  return (
    <button
      className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={() => {
        ListaItensVenda(props.data.carrinhoId);
      }}
    >
      Ver Produtos
    </button>
  );
};

function Carrinho() {
  const { carrinho } = useContext(CarrinhoContext);
  const [columnsDef, setColumnsDef] = useState([
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
      headerName: "Data do Carrinho",
      field: "dataCarrinho",
      maxWidth: 100,
    },
    {
      field: "",
      cellRenderer: CustomButtonLista,
      maxWidth: 160,
    },
  ]);
  return (
    <div>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">
          Lista de carrinhos abandonados
        </h3>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 pb-4"></div>
      <div>
        <AgGrid Data={carrinho} Columns={columnsDef} />
      </div>
    </div>
  );
}

export default Carrinho;
