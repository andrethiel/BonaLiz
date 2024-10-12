"use client";
import { InserirFornecedor } from "@/Api/Controllers/Forncedor";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import Select from "@/Components/Select";
import { Estados } from "@/constants/estados";
import { Iniciais } from "@/Utils/Iniciais";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaGlobeAmericas, FaShoppingBasket } from "react-icons/fa";

const Criar: React.FC = () => {
  async function Inserir() {
    form.Iniciais = Iniciais(form.Nome);
    const response = await InserirFornecedor(form);
    if (!response.status) {
      setAlert({ ...alert, message: response.message, type: "Danger" });
    } else {
      router.back();
    }
  }

  const [form, setForm] = useState({
    Nome: "",
    CNPJ: "",
    Estado: "",
    Iniciais: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const router = useRouter();

  return (
    <div>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Fornecedores</h3>
      </div>
      {alert && <Alert children={alert.message} type={alert.type} />}
      <div className="w-full gap-2">
        <Input
          placeholder={"Nome do fornecedor"}
          icon={<FaShoppingBasket />}
          onChange={handleChange}
          name={"Nome"}
          id={"Nome"}
        />
        <MaskInput
          placeholder={"CNPJ"}
          icon={<AiOutlineExclamationCircle />}
          mask={"00.000.000/0000-00"}
          onChange={handleChange}
          name={"CNPJ"}
          id={"CNPJ"}
        />
        <Select
          data={Estados}
          placeholder={"Selecione um estado"}
          icon={<FaGlobeAmericas />}
          onChange={handleChange}
          name={"Estado"}
          id={"Estado"}
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

export default Criar;
