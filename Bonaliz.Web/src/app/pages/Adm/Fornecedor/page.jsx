"use client";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Button from "@/Components/Button";
import AgGrid from "@/Components/Grid";
import Linked from "@/Components/Link";
import { useRouter } from "next/navigation";
import CustomLoading from "@/Components/CustomLoadingGrid";
import { FornecedorContext, Lista } from "@/Hooks/Fornecedor";
import Alert from "@/Components/Alert";
import { GlobalContext } from "@/Hooks/GlobalState";

const CustomButtonComponent = (props) => {
  const router = useRouter();
  return (
    <Button
      color={"primary"}
      onClick={() => router.push("Fornecedor/Editar?Guid=" + props.data.guid)}
    >
      Editar/Excluir
    </Button>
  );
};

function Fornecedor() {
  const { Fornecedores, Pesquisar, handleChange, Listar } =
    useContext(FornecedorContext);
  const { isLoading, alert } = useContext(GlobalContext);

  useEffect(() => {
    Listar();
  }, []);

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
      field: "inativo",
      valueFormatter: (p) =>
        p.value.toString() == "True" ? "Inativo" : "Ativo",
    },
    {
      field: "",
      cellRenderer: CustomButtonComponent,
    },
  ]);

  return (
    <Suspense>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      <div className={`${isLoading && "hidden"}`}>
        <div className="p-3 m-3">
          <h3 className="text-2xl font-semibold">Lista de Fornecedores</h3>
        </div>
        {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
        <div className="grid grid-row-3 lg:grid-cols-3 gap-2">
          <div>
            <Input
              icon={"shopping-basket"}
              placeholder="Nome do fornecedor"
              onChange={handleChange}
              id={"Nome"}
              name={"Nome"}
            />
          </div>
          <div>
            <MaskInput
              icon={"circle-alert"}
              placeholder={"CNPJ"}
              mask={"00.000.000/0000-00"}
              id={"CNPJ"}
              name={"CNPJ"}
              onChange={handleChange}
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
