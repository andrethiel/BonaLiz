"use client";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import React, { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Button from "@/Components/Button";
import AgGrid from "@/Components/Grid";
import Linked from "@/Components/Link";
import {
  ListarFornecedor,
  PesquisarFornecedor,
} from "@/Api/Controllers/Forncedor";
import { useRouter } from "next/navigation";
import CustomLoading from "@/Components/CustomLoadingGrid";

const CustomButtonComponent = (props) => {
  const router = useRouter();
  return (
    <button
      className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={() => router.push("Fornecedor/Editar?Guid=" + props.data.guid)}
    >
      Editar/Excluir
    </button>
  );
};

function Fornecedor() {
  useEffect(() => {
    Lista();
  }, []);

  async function Lista() {
    setIsLoading(true);
    try {
      const response = await ListarFornecedor();
      if (response.length > 0) {
        setFornecedores(response);
      }
    } catch (e) {
      setFornecedores([]);
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
    setIsLoading(false);
  }

  async function Pesquisar() {
    setIsLoading(true);
    try {
      const response = await PesquisarFornecedor(form);
      if (response.length > 0) {
        setFornecedores(response);
      } else {
        setFornecedores([]);
        setAlert({
          ...alert,
          type: "Danger",
          message: "Nenhum fornecedor encontrado",
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
  }

  const [form, setForm] = useState({
    Nome: "",
    CNPJ: "",
    Iniciais: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [Fornecedores, setFornecedores] = useState();
  const [columnsDef, setColumnsDef] = useState([
    {
      field: "nome",
    },
    {
      field: "cnpj",
    },
    {
      field: "estado",
    },
    {
      field: "iniciais",
    },
    {
      field: "",
      cellRenderer: CustomButtonComponent,
    },
  ]);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Lista de Fornecedores</h3>
      </div>
      <div className="grid grid-row-4 lg:grid-cols-4 gap-2">
        <div>
          <Input
            icon={<FaShoppingBasket />}
            placeholder="Nome do fornecedor"
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
          />
        </div>
        <div>
          <MaskInput
            icon={<AiOutlineExclamationCircle />}
            placeholder={"CNPJ"}
            mask={"00.000.000/0000-00"}
            onChange={(e) => setForm({ ...form, CNPJ: e.target.value })}
          />
        </div>
        <div>
          <Input
            icon={<FaShoppingBasket />}
            placeholder="Iniciais do fornecedor"
            onChange={(e) => setForm({ ...form, Iniciais: e.target.value })}
          />
        </div>
        <div>
          <Button color={"primary"} onClick={Pesquisar}>
            Pesquisar
          </Button>
        </div>
      </div>
      <div className="mb-5 flex justify-end">
        <Linked href={"Fornecedor/Criar"}>Criar fornecedor</Linked>
      </div>
      <div>
        <AgGrid Data={Fornecedores} Columns={columnsDef} />
      </div>
    </>
  );
}

export default Fornecedor;
