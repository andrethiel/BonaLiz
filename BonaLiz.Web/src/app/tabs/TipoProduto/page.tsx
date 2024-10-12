"use client";
import {
  ListarTipoProduto,
  PesquisarTipoProduto,
} from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import AgGrid from "@/Components/Grid";
import Input from "@/Components/Input";
import Linked from "@/Components/Link";
import { ColDef, ColGroupDef } from "@ag-grid-community/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

const CustomButtonComponent = (props) => {
  const router = useRouter();
  return (
    <button
      className="bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={() => router.push("TipoProduto/Editar?Guid=" + props.data.guid)}
    >
      Editar/Excluir
    </button>
  );
};

const TipoProduto: React.FC = () => {
  useEffect(() => {
    Listar();
  }, []);

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarTipoProduto();
      if (response.length > 0) {
        setTipoProduto(response);
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

  async function Pesquisar() {
    setIsLoading(true);
    try {
      const response = await PesquisarTipoProduto(form);
      if (response.length > 0) {
        setTipoProduto(response);
      } else {
        setTipoProduto([]);
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
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [TipoProduto, setTipoProduto] = useState<TipoProduto[]>();
  const [columnsDef, setColumnsDef] = useState<
    (ColDef<any, any> | ColGroupDef<any>)[]
  >([
    {
      field: "nome",
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
        <h3 className="text-2xl font-semibold">Lista de Tipo de produtos</h3>
      </div>
      <div className="grid grid-col-4 grid-flow-col gap-2">
        <div>
          <Input
            icon={<FaShoppingBasket />}
            placeholder="Tipo de produto"
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
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
        <Linked href={"TipoProduto/Cadastrar"}>Criar tipo de produto</Linked>
      </div>
      <div>
        <AgGrid Data={TipoProduto} Columns={columnsDef} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default TipoProduto;
