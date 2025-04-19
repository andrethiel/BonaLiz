"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import Select from "@/Components/Select";
import { Estados } from "@/constants/estados";
import { FornecedorContext } from "@/Hooks/Fornecedor";
import { GlobalContext } from "@/Hooks/GlobalState";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect } from "react";
const Editar = () => {
  const param = useSearchParams();
  const guid = param.get("Guid");

  const {
    form,
    checked,
    setChecked,
    BuscarFornecedor,
    Editar,
    handleChange,
    router,
  } = useContext(FornecedorContext);

  const { isLoading, alert } = useContext(GlobalContext);

  useEffect(() => {
    BuscarFornecedor(guid);
  }, [guid]);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Fornecedores</h3>
      </div>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <input name={"Id"} id={"Id"} type="hidden" value={form.Id} />
        <input name={"guid"} id={"guid"} type="hidden" value={form.Guid} />
        <Input
          placeholder={"Nome do fornecedor"}
          icon={"shopping-basket"}
          onChange={handleChange}
          name={"Nome"}
          id={"Nome"}
          value={form.Nome}
        />
        <MaskInput
          placeholder={"CNPJ"}
          icon={"circle-alert"}
          mask={"00.000.000/0000-00"}
          onChange={handleChange}
          name={"CNPJ"}
          id={"CNPJ"}
          value={form.CNPJ}
        />
        <Select
          data={Estados}
          placeholder={"Selecione um estado"}
          icon={"globe"}
          onChange={handleChange}
          name={"Estado"}
          id={"Estado"}
          value={form.Estado}
        />
        <Check onChange={(e) => setChecked(e.target.checked)} value={checked}>
          Inativo
        </Check>
        <Button color={"primary"} onClick={Editar}>
          Editar
        </Button>
        <Button color={"secondary"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </Suspense>
  );
};

export default Editar;
