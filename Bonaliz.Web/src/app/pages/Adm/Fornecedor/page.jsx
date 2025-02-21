"use client";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import React, { Suspense, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Button from "@/Components/Button";
import AgGrid from "@/Components/Grid";
import Linked from "@/Components/Link";
import { useRouter } from "next/navigation";
import CustomLoading from "@/Components/CustomLoadingGrid";
import { Lista } from "@/Hooks/Fornecedor";
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

function Fornecedor() {
  const [form, setForm] = useState({
    Nome: "",
    CNPJ: "",
    Iniciais: "",
  });

  const {
    alert,
    Fornecedores,
    isLoading,
    setAlert,
    setIsLoading,
    setFornecedores,
    Pesquisar,
  } = Lista(form);

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
      field: "inativo",
      valueFormatter: (p) =>
        p.value.toString() == "True" ? "Inativo" : "Ativo",
    },
    {
      field: "",
      cellRenderer: CustomButtonComponent,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setAlert({
        ...alert,
        message: "",
        type: "",
      });
    }, [500]);
  }, [alert]);

  return (
    <Suspense>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      <div className={`${isLoading && "hidden"}`}>
        <div className="p-3 m-3">
          <h3 className="text-2xl font-semibold">Lista de Fornecedores</h3>
        </div>
        {alert && <Alert type={alert.type}>{alert.message}</Alert>}
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
      </div>
    </Suspense>
  );
}

export default Fornecedor;
