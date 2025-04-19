"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import { GlobalContext } from "@/Hooks/GlobalState";
import { TipoProdutoContext } from "@/Hooks/TipoProduto";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect } from "react";

const Editar = () => {
  const param = useSearchParams();
  const guid = param.get("Guid");

  const { Buscar, form, handleChange, Editar, router, checked, setChecked } =
    useContext(TipoProdutoContext);

  const { isLoading, alert } = useContext(GlobalContext);

  useEffect(() => {
    Buscar(guid);
  }, [guid]);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Editar tipo de produto</h3>
      </div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <input name={"Id"} id={"Id"} value={form.Id} type="hidden" />
        <input name={"guid"} id={"guid"} value={form.Guid} type="hidden" />
        <div>
          <Input
            placeholder={"Tipo de Produto"}
            icon={"shopping-basket"}
            name={"Nome"}
            id={"Nome"}
            onChange={handleChange}
            value={form.Nome}
          />
        </div>
        <div>
          <Check onChange={(e) => setChecked(e.target.checked)} value={checked}>
            Inativo
          </Check>
        </div>
        <div>
          <Button color={"primary"} onClick={Editar}>
            Editar
          </Button>
          <Button color={"secondary"} onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default Editar;
