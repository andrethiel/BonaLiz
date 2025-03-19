"use client";
import { InserirFornecedor } from "@/Api/Controllers/Forncedor";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import Select from "@/Components/Select";
import { Estados } from "@/constants/estados";
import { FornecedorContext } from "@/Hooks/Fornecedor";
import { Iniciais } from "@/Utils/Iniciais";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Criar = () => {
  const { handleChange, isLoading, alert, CriarFornecedor } =
    useContext(FornecedorContext);

  const router = useRouter();

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Fornecedores</h3>
      </div>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <div>
          <Input
            placeholder={"Nome do fornecedor"}
            icon={"shopping-basket"}
            onChange={handleChange}
            name={"Nome"}
            id={"Nome"}
          />
        </div>
        <div>
          <MaskInput
            placeholder={"CNPJ"}
            icon={"circle-alert"}
            mask={"00.000.000/0000-00"}
            onChange={handleChange}
            name={"CNPJ"}
            id={"CNPJ"}
          />
        </div>
        <div>
          <Select
            data={Estados}
            placeholder={"Selecione um estado"}
            icon={"globe"}
            onChange={handleChange}
            name={"Estado"}
            id={"Estado"}
          />
        </div>

        <Button color={"primary"} onClick={CriarFornecedor}>
          Criar
        </Button>
        <Button color={"secondary"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default Criar;
