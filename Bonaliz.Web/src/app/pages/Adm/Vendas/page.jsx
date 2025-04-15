"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import Select from "@/Components/Select";
import Select2 from "@/Components/Select2";
import { StatusVenda } from "@/constants/status";
import { GlobalState } from "@/Hooks/GlobalState";
import { SelectListProdutos } from "@/Hooks/ProdutosSelect";
import { VendasContext } from "@/Hooks/Venda";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

function Vendas() {
  const {
    vendasLista,
    Filtrar,
    form,
    Cancela,
    IsOpen,
    setIsOpen,
    Status,
    handleCloseModal,
    handleChange,
    show,
    setShow,
    isModalVenda,
    setIsModalVenda,
    itensVenda,
    ListaItensVenda,
    total,
  } = useContext(VendasContext);

  const { isLoading, alert } = GlobalState();

  const CustomButtonComponent = (props) => {
    const router = useRouter();
    return (
      <button
        className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={() => {
          Cancela(props.data.id);
        }}
      >
        Cancelar Venda
      </button>
    );
  };

  const CustomButtonStatus = (props) => {
    return (
      <button
        className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={() => {
          setIsOpen(true);
          handleChange({
            target: { name: "VendaId", value: props.data.id },
          });
        }}
      >
        Editar status
      </button>
    );
  };

  const CustomButtonLista = (props) => {
    return (
      <button
        className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={() => {
          ListaItensVenda(props.data.id);
        }}
      >
        Ver Lista
      </button>
    );
  };

  const { selectProdutos } = SelectListProdutos();
  const [columnsDef, setColumnsDef] = useState([
    {
      field: "",
      cellRenderer: CustomButtonLista,
      maxWidth: 135,
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
      headerName: "Status",
      field: "status",
      maxWidth: 110,
    },
    {
      headerName: "Cancelada",
      field: "cancelada",
      valueFormatter: (p) => (p.value.toString() == "True" ? "Cancelada" : ""),
      maxWidth: 120,
    },
    {
      field: "",
      cellRenderer: CustomButtonStatus,
      maxWidth: 140,
    },
    {
      field: "",
      cellRenderer: CustomButtonComponent,
      maxWidth: 160,
    },
  ]);

  return (
    <div>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className={`flex flex-col my-6 ${isLoading && "hidden"}`}>
        {IsOpen && (
          <Modal close={handleCloseModal} title={"Alterar status de pagemento"}>
            <Select
              placeholder={"Selecione o status de pagamento"}
              data={StatusVenda}
              icon={"badge-dollar-sign"}
              id={"Status"}
              name="Status"
              onChange={handleChange}
            />
            <Button
              color={"primary"}
              onClick={() => Status(form.VendaId, form.Status)}
            >
              Alterar status
            </Button>
            <Button color={"secondary"} onClick={handleCloseModal}>
              Voltar
            </Button>
          </Modal>
        )}
        <div className="p-3 m-3">
          <h3 className="text-2xl font-semibold">Lista de Vendas</h3>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 pb-4">
          <Input
            placeholder={"Nome do cliente"}
            icon={"tag"}
            name={"Nome"}
            id={"Nome"}
            onChange={handleChange}
          />
          <Select
            placeholder={"Selecione o status de pagamento"}
            data={StatusVenda}
            icon={"badge-dollar-sign"}
            name={"Status"}
            id={"Status"}
            onChange={handleChange}
          />
          {selectProdutos && (
            <Select2
              data={selectProdutos}
              placeholder={"Selecione um Produto"}
              onChange={(selectedOption) =>
                handleChange({
                  target: { name: "ProdutoId", value: selectedOption?.value },
                })
              }
              name={"Status"}
              id={"Status"}
              icon={"package-search"}
            />
          )}
          <DataPicker
            onChange={(selectedOption) =>
              handleChange({
                target: { name: "DataVenda", value: selectedOption },
              })
            }
            value={form.DataVenda}
            show={show}
            setIsOpen={() => setShow(false)}
            onFocus={() => setShow(true)}
          />

          <Button color={"primary"} onClick={Filtrar}>
            Pesquisar
          </Button>
        </div>
        <div>
          <AgGrid Data={vendasLista} Columns={columnsDef} />
        </div>
      </div>
      {isModalVenda && (
        <Modal>
          <div>
            <h5 className="text-center text-lg font-medium mb-4">
              Produtos Vendidos
            </h5>
          </div>
          <div className="space-y-4 w-full max-w-sm mx-auto">
            {itensVenda.map((item) => (
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
          <div className="mt-auto border-t pt-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>
          <Button color={"primary"} onClick={() => setIsModalVenda(false)}>
            Fechar
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default Vendas;
