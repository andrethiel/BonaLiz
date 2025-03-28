"use client";
import { ClienteFiltrar, ListarClientes } from "@/Api/Controllers/Cliente";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Linked from "@/Components/Link";
import Modal from "@/Components/Modal";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

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
  const [form, setForm] = useState({
    Nome: "",
    Email: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
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

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    Listar();
  }, []);

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarClientes();
      if (response.length > 0) {
        setClientes(response);
      } else {
        setClientes([]);
        setAlert({
          ...alert,
          type: "Danger",
          message: "Nenhum cliente encontrado",
        });
      }
      setIsLoading(false);
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    }
  }

  async function Pesquisar() {
    setIsLoading(true);
    try {
      const response = await ClienteFiltrar();
      if (response.length > 0) {
        setClientes(response);
      } else {
        setClientes([]);
        setAlert({
          ...alert,
          type: "Danger",
          message: "Nenhum cliente encontrado",
        });
      }
      setIsLoading(false);
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
      setIsLoading(false);
    }
  }

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  if (modalIsOpen)
    return <Modal cliente={form.Nome} onClick={() => setmodalIsOpen(false)} />;

  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Lista de Clientes</h3>
      </div>
      <div className="grid grid-row-4 lg:grid-cols-4 gap-2">
        <div>
          <Input
            icon={<FaUser />}
            placeholder="Nome do cliente"
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
          />
        </div>
        <div>
          <Input
            icon={<MdAlternateEmail />}
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
