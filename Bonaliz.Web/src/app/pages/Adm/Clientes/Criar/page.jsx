"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import { ClientesContext } from "@/Hooks/Clientes";
import { GlobalContext } from "@/Hooks/GlobalState";
import React, { Suspense, useContext } from "react";

function Criar() {
  const { handleChange, CriarCliente, Voltar } = useContext(ClientesContext);

  const { isLoading, alert } = useContext(GlobalContext);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;
  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastrar Clientes</h3>
      </div>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <div>
          <Input
            placeholder={"Nome do cliente"}
            icon={"user-round"}
            name={"Nome"}
            id={"Nome"}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            placeholder={"Email do cliente"}
            icon={"at-sign"}
            name={"Email"}
            id={"Email"}
            type={"email"}
            onChange={handleChange}
          />
        </div>
        <div>
          <MaskInput
            placeholder={"Telefone do cliente"}
            icon={"phone"}
            name={"Telefone"}
            id={"Telefone"}
            mask={"(00) 00000-0000"}
            onChange={handleChange}
          />
        </div>
        <Button color={"primary"} onClick={CriarCliente}>
          Criar
        </Button>
        <Button color={"secondary"} onClick={Voltar}>
          Voltar
        </Button>
      </div>
    </Suspense>
  );
}

export default Criar;
