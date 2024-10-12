"use client";
import {
  EditarTipoProduto,
  TipoProdutoPorGuid,
} from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

// import { Container } from './styles';

const Editar: React.FC = () => {
  const param = useSearchParams();

  async function Buscar() {
    const response = await TipoProdutoPorGuid(param.get("Guid"));
    if (response.id != 0) {
      setForm({
        ...form,
        Nome: response.nome,
        Id: response.id,
        Guid: response.guid,
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

  async function Editar() {
    const response = await EditarTipoProduto(form);
    if (!response.status) {
      setAlert({ ...alert, message: response.message, type: "Danger" });
    } else {
      router.back();
    }
  }

  const [form, setForm] = useState({
    Id: 0,
    Guid: "",
    Nome: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const router = useRouter();
  return (
    <div>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Fornecedores</h3>
      </div>
      {alert && <Alert children={alert.message} type={alert.type} />}
      <div className="w-full gap-2">
        <input name={"Id"} id={"Id"} value={form.Id} />
        <input name={"guid"} id={"guid"} value={form.Guid} />
        <Input
          placeholder={"Tipo de Produto"}
          icon={<FaShoppingBasket />}
          name={"Nome"}
          id={"Nome"}
          onChange={(e) => setForm({ ...form, Nome: e.target.value })}
          value={form.Nome}
        />

        <Button children={"Editar"} color={"primary"} onClick={Editar} />
        <Button
          children={"Voltar"}
          color={"secondary"}
          onClick={() => router.back()}
        />
      </div>
    </div>
  );
};

export default Editar;
