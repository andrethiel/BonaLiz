"use client";
import { InserirTipoProduto } from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

// import { Container } from './styles';

const Cadastrar: React.FC = () => {
  async function Inserir() {
    const response = await InserirTipoProduto(form);
    if (!response.status) {
      setAlert({ ...alert, message: response.message, type: "Danger" });
    } else {
      router.back();
    }
  }

  const [form, setForm] = useState({
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
        <Input
          placeholder={"Tipo de Produto"}
          icon={<FaShoppingBasket />}
          name={"Nome"}
          id={"Nome"}
          onChange={(e) => setForm({ ...form, Nome: e.target.value })}
        />

        <Button children={"Criar"} color={"primary"} onClick={Inserir} />
        <Button
          children={"Voltar"}
          color={"secondary"}
          onClick={() => router.back()}
        />
      </div>
    </div>
  );
};

export default Cadastrar;
