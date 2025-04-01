"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import { ClientesContext } from "@/Hooks/Clientes";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect } from "react";

function Editar() {
  const param = useSearchParams();
  const guid = param.get("Guid");

  const {
    isLoading,
    alert,
    form,
    handleChange,
    router,
    Voltar,
    checked,
    setChecked,
    ClienteEditar,
    Buscar,
  } = useContext(ClientesContext);

  useEffect(() => {
    Buscar(guid);
  }, []);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastrar Clientes</h3>
      </div>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <input name={"Id"} id={"Id"} type="hidden" value={form.Id} />
        <input name={"guid"} id={"guid"} type="hidden" value={form.Guid} />
        <div>
          <Input
            placeholder={"Nome do cliente"}
            icon={"user-round"}
            name={"Nome"}
            id={"Nome"}
            onChange={handleChange}
            value={form.Nome}
          />
        </div>
        <div>
          <Input
            placeholder={"Email do cliente"}
            icon={"at-sign"}
            name={"Email"}
            id={"Email"}
            type={"email"}
            value={form.Email}
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
            value={form.Telefone}
            onChange={handleChange}
          />
        </div>
        <Check onChange={(e) => setChecked(e.target.checked)} value={checked}>
          Inativo
        </Check>
        <Button color={"primary"} onClick={ClienteEditar}>
          Editar
        </Button>
        <Button color={"secondary"} onClick={Voltar}>
          Voltar
        </Button>
      </div>
    </Suspense>
  );
}

export default Editar;
