"use client";
import { InserirFornecedor } from "@/Api/Controllers/Forncedor";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import Select from "@/Components/Select";
import { Estados } from "@/constants/estados";
import { Iniciais } from "@/Utils/Iniciais";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaGlobeAmericas, FaShoppingBasket } from "react-icons/fa";

const Criar = () => {
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

  async function CriarFornecedor() {
    if (Valida()) {
      setIsLoading(true);
      form.Iniciais = Iniciais(form.Nome);
      const response = await InserirFornecedor(form);
      console.log(response);
      if (!response.status) {
        setAlert({ ...alert, message: response.message, type: "Danger" });
      } else {
        setAlert({ ...alert, message: response.message, type: "Success" });
        router.back();
      }
      setIsLoading(false);
    }
  }

  function Valida() {
    if (form.Nome == "") {
      setAlert({
        ...alert,
        message: "Digite o nome do fornecedor",
        type: "Danger",
      });
      return false;
    }
    if (form.CNPJ == "") {
      setAlert({
        ...alert,
        message: "Digite o CNPJ do fornecedor",
        type: "Danger",
      });
      return false;
    }
    if (form.Estado == "") {
      setAlert({
        ...alert,
        message: "Selecione o estado do fornecedor",
        type: "Danger",
      });
      return false;
    }

    return true;
  }

  useEffect(() => {
    setTimeout(() => {
      setAlert({
        ...alert,
        message: "",
        type: "",
      });
    }, [1500]);
  }, [alert]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const router = useRouter();

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
            placeholder={"Nome do fornecedor"}
            icon={<FaShoppingBasket />}
            onChange={handleChange}
            name={"Nome"}
            id={"Nome"}
          />
        </div>
        <div>
          <MaskInput
            placeholder={"CNPJ"}
            icon={<AiOutlineExclamationCircle />}
            mask={"00.000.000/0000-00"}
            onChange={handleChange}
            name={"CNPJ"}
            id={"CNPJ"}
          />
        </div>
        <div>
          <Select
            data={Estados}
            placeholder={"Selecione um estado"}
            icon={<FaGlobeAmericas />}
            onChange={handleChange}
            name={"Estado"}
            id={"Estado"}
          />
        </div>

        <Button color={"primary"} onClick={CriarFornecedor}>
          Criar
        </Button>
        <Button color={"secondary"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default Criar;
