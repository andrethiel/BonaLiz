"use client";
import {
  EditarFornecedor,
  ObterFornecedorGuid,
} from "@/Api/Controllers/Forncedor";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import Select from "@/Components/Select";
import { Estados } from "@/constants/estados";
import { Iniciais } from "@/Utils/Iniciais";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaGlobeAmericas, FaShoppingBasket } from "react-icons/fa";

// import { Container } from './styles';

const Editar = () => {
  const param = useSearchParams();

  async function Buscar() {
    const response = await ObterFornecedorGuid(param.get("Guid"));
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
    form.Iniciais = Iniciais(form.Nome);
    const response = await EditarFornecedor(form);
    console.log(response);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Fornecedores</h3>
      </div>
      {alert && <Alert children={alert.message} type={alert.type} />}
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

        <Button children={"Criar"} color={"primary"} onClick={Editar} />
        <Button
          children={"Voltar"}
          color={"secondary"}
          onClick={() => router.back()}
        />
      </div>
    </Suspense>
  );
};

export default Editar;
