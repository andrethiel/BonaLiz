"use client";
import {
  ListarFornecedor,
  PesquisarFornecedor,
} from "@/Api/Controllers/Forncedor";
import AgGrid from "@/Components/Grid";
import React, { useEffect, useRef, useState } from "react";
import { ColDef, ColGroupDef } from "@ag-grid-community/core";
import Linked from "@/Components/Link";
import { useRouter } from "next/navigation";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { FaShoppingBasket } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import MaskInput from "@/Components/InputMask";
import Alert from "@/Components/Alert";

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

const Fornecedor = () => {
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
  const primeiroRender = useRef(true);
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

  return (
    <div>
      {alert && <Alert children={alert.message} type={alert.type} />}
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
          <Button
            children={"Pesquisar"}
            color={"primary"}
            onClick={Pesquisar}
          />
        </div>
      </div>
      <div className="mb-5 flex justify-end">
        <Linked href={"Fornecedor/Criar"}>Criar fornecedor</Linked>
      </div>
      <div>
        <AgGrid Data={Fornecedores} Columns={columnsDef} />
      </div>
    </div>
  );
};

export default Fornecedor;
