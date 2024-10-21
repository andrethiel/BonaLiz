"use client";
import {
  EditarFornecedor,
  ObterFornecedorGuid,
} from "@/Api/Controllers/Forncedor";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import Select from "@/Components/Select";
import { Estados } from "@/constants/estados";
import { Iniciais } from "@/Utils/Iniciais";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaGlobeAmericas, FaShoppingBasket } from "react-icons/fa";

const Editar = () => {
  const param = useSearchParams();
  const guid = param.get("Guid");
  const [isLoading, setIsLoading] = useState(false);

  async function Buscar() {
    setIsLoading(true);
    const response = await ObterFornecedorGuid(guid);
    if (response.id != 0) {
      setForm({
        ...form,
        CNPJ: response.cnpj,
        Nome: response.nome,
        Estado: response.estado,
        Guid: response.guid,
        Id: response.id,
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

  const [form, setForm] = useState({
    Id: 0,
    Guid: "",
    Nome: "",
    CNPJ: "",
    Estado: "",
    Iniciais: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const router = useRouter();

  async function Editar() {
    setIsLoading(true);
    form.Iniciais = Iniciais(form.Nome);
    const response = await EditarFornecedor(form);
    if (response.status) {
      setAlert({
        ...alert,
        type: "Success",
        message: response.message,
      });
    } else {
      setAlert({
        ...alert,
        type: "Danger",
        message: response.message,
      });
    }
    setIsLoading(false);
  }

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Fornecedores</h3>
      </div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="w-full gap-2">
        <input name={"Id"} id={"Id"} type="hidden" value={form.Id} />
        <input name={"guid"} id={"guid"} type="hidden" value={form.Guid} />
        <Input
          placeholder={"Nome do fornecedor"}
          icon={<FaShoppingBasket />}
          onChange={(e) => setForm({ ...form, Nome: e.target.value })}
          name={"Nome"}
          id={"Nome"}
          value={form.Nome}
        />
        <MaskInput
          placeholder={"CNPJ"}
          icon={<AiOutlineExclamationCircle />}
          mask={"00.000.000/0000-00"}
          onChange={(e) => setForm({ ...form, CNPJ: e.target.value })}
          name={"CNPJ"}
          id={"CNPJ"}
          value={form.CNPJ}
        />
        <Select
          data={Estados}
          placeholder={"Selecione um estado"}
          icon={<FaGlobeAmericas />}
          onChange={(e) => setForm({ ...form, Estado: e.target.value })}
          name={"Estado"}
          id={"Estado"}
          value={form.Estado}
        />

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
