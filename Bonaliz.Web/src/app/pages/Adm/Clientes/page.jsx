"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Linked from "@/Components/Link";
import Modal from "@/Components/Modal";
import { ClientesContext } from "@/Hooks/Clientes";
import { useRouter } from "next/navigation";
import React, { Suspense, useContext, useState } from "react";

const CustomButtonComponent = (props) => {
  const router = useRouter();
  return (
    <button
      className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={() => router.push("Clientes/Editar?Guid=" + props.data.guid)}
    >
      Editar/Excluir
    </button>
  );
};

function Clientes() {
  const { clientes, isLoading, alert, setForm, form, Pesquisar } =
    useContext(ClientesContext);

  const [columnsDef, setColumnsDef] = useState([
    {
      field: "nome",
    },
    {
      field: "email",
    },
    {
      field: "telefone",
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

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  // if (modalIsOpen)
  //   return <Modal cliente={form.Nome} onClick={() => setmodalIsOpen(false)} />;

  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Lista de Clientes</h3>
      </div>
      <div className="grid grid-row-4 lg:grid-cols-4 gap-2">
        <div>
          <Input
            icon={"user-round"}
            placeholder="Nome do cliente"
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
          />
        </div>
        <div>
          <Input
            icon={"at-sign"}
            placeholder="Email do cliente"
            onChange={(e) => setForm({ ...form, Email: e.target.value })}
          />
        </div>
        <div>
          <Button color={"primary"} onClick={Pesquisar}>
            Pesquisar
          </Button>
        </div>
      </div>
      <div className="mb-5 flex justify-end">
        <Linked href={"Clientes/Criar"}>Criar Cliente</Linked>
      </div>
      <div>
        <AgGrid Data={clientes} Columns={columnsDef} />
      </div>
    </Suspense>
  );
}

export default Clientes;
