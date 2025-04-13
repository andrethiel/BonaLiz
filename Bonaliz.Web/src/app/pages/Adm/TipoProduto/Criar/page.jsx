"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import { TipoProdutoContext } from "@/Hooks/TipoProduto";
import React, { useContext } from "react";

const Cadastrar = () => {
  const { isLoading, alert, handleChange, Inserir, router } =
    useContext(TipoProdutoContext);

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
            placeholder={"Tipo de Produto"}
            icon={"shopping-basket"}
            name={"Nome"}
            id={"Nome"}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button color={"primary"} onClick={Inserir}>
            Criar
          </Button>
          <Button color={"secondary"} onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cadastrar;
