"use client";
import {
  EditarTipoProduto,
  TipoProdutoPorGuid,
} from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

// import { Container } from './styles';

const Editar = () => {
  const param = useSearchParams();

  async function Buscar() {
    setIsLoading(true);
    const response = await TipoProdutoPorGuid(param.get("Guid"));
    if (response.id != 0) {
      setForm({
        ...form,
        Nome: response.nome,
        Id: response.id,
        Guid: response.guid,
        Inativo:
          response.inativo == "True" ? setChecked(true) : setChecked(false),
      });
    } else {
      setAlert({
        ...alert,
        type: "Danger",
        message: "Fornecedor não encontrado",
      });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    Buscar();
  }, []);

  async function Editar() {
    setIsLoading(true);
    form.Inativo = checked.toString();
    const response = await EditarTipoProduto(form);
    if (!response.status) {
      setAlert({ ...alert, message: response.message, type: "Danger" });
    } else {
      router.back();
    }
    setIsLoading(true);
  }

  const [form, setForm] = useState({
    Id: 0,
    Guid: "",
    Nome: "",
    Inativo: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
            icon={<FaShoppingBasket />}
            name={"Nome"}
            id={"Nome"}
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
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
