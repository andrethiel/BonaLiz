"use client";
import { InserirTipoProduto } from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

// import { Container } from './styles';

const Cadastrar = () => {
  async function Inserir() {
    setIsLoading(true);
    const response = await InserirTipoProduto(form);
    if (!response.status) {
      setAlert({ ...alert, message: response.message, type: "Danger" });
    } else {
      router.back();
    }
    setIsLoading(false);
  }

  const [form, setForm] = useState({
    Nome: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Fornecedores</h3>
      </div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <div>
          <Input
            placeholder={"Tipo de Produto"}
            icon={<FaShoppingBasket />}
            name={"Nome"}
            id={"Nome"}
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
          />
        </div>
        <div>
          <Button color={"primary"} onClick={Inserir}>
            Criar
          </Button>
          <Button color={"secondary"} onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cadastrar;
