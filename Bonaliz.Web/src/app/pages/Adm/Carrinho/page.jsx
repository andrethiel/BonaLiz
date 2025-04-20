"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import AgGrid from "@/Components/Grid";
import Modal from "@/Components/Modal";
import { useAlert } from "@/Hooks/Alert";
import { CarrinhoContext } from "@/Hooks/Carrinho";
import { GlobalContext } from "@/Hooks/GlobalState";
import React, { useContext, useEffect, useState } from "react";

function Carrinho() {
  const {
    carrinho,
    isModalCarrinho,
    setIsModalCarrinho,
    itensCarrinho,
    ListarItensCarrinho,
    total,
    Listar,
  } = useContext(CarrinhoContext);

  useEffect(() => {
    Listar();
  }, []);

  const { isLoading, alert } = useContext(GlobalContext);

  const CustomButtonLista = (props) => {
    return (
      <Button
        color={"primary"}
        onClick={() => {
          ListarItensCarrinho(props.data.carrinhoId);
        }}
      >
        Editar/Excluir
      </Button>
    );
  };
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
      maxWidth: 160,
    },
    {
      field: "",
      cellRenderer: CustomButtonLista,
      maxWidth: 160,
    },
  ]);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">
          Lista de carrinhos abandonados
        </h3>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 pb-4"></div>
      <div>
        <AgGrid Data={carrinho} Columns={columnsDef} />
      </div>
      {isModalCarrinho && (
        <Modal>
          <h5 className="text-center text-lg font-medium">Cliente</h5>
          <div className="mt-auto border-t">
            <div className="flex flex-col p-4">
              <span>Nome do cliente:</span>
              <span>{itensCarrinho[0].nomeCliente}</span>
              <span>Telefone: {itensCarrinho[0].telefoneCliente}</span>
              <span>Email: {itensCarrinho[0].emailCliente}</span>
            </div>
          </div>

          <h5 className="text-center text-lg font-medium">
            Produtos no carrinho
          </h5>
          <div className="mt-auto border-t">
            <div className="space-y-4 w-full max-w-sm mx-auto">
              {itensCarrinho.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-center gap-4 rounded-lg p-4"
                >
                  <img
                    src={item.imagemProduto}
                    alt={item.imagemProduto}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.nomeProduto}</h3>
                    <p className="text-sm text-gray-500">{item.valor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto border-t pt-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>
          <Button color={"primary"} onClick={() => setIsModalCarrinho(false)}>
            Fechar
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default Carrinho;
