"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Linked from "@/Components/Link";
import { GlobalContext } from "@/Hooks/GlobalState";
import { TipoProdutoContext } from "@/Hooks/TipoProduto";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const CustomButtonComponent = (props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("TipoProduto/Editar?Guid=" + props.data.guid)}
      color={"secondary"}
    >
      Editar/Excluir
    </Button>
  );
};

const TipoProduto = () => {
  const { Pesquisar, handleChange, TipoProduto } =
    useContext(TipoProdutoContext);

  const { isLoading, alert } = useContext(GlobalContext);

  useEffect(() => {
    Listar();
  }, []);

  const [columnsDef, setColumnsDef] = useState([
    {
      field: "nome",
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

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div>
      {alert.message && <Alert children={alert.message} type={alert.type} />}
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Lista de Tipo de produtos</h3>
      </div>
      <div className="grid grid-row-2 lg:grid-cols-2 gap-2">
        <div>
          <Input
            icon={"shopping-basket"}
            placeholder="Tipo de produto"
            id={"Nome"}
            name={"Nome"}
            onChange={handleChange}
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
        <Linked href={"TipoProduto/Criar"}>Criar tipo de produto</Linked>
      </div>
      <div>
        <AgGrid Data={TipoProduto} Columns={columnsDef} />
      </div>
    </div>
  );
};

export default TipoProduto;
