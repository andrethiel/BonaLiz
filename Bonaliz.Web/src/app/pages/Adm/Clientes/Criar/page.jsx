"use client";
import { InserirCliente } from "@/Api/Controllers/Cliente";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPhoneIphone } from "react-icons/md";

// import { Container } from './styles';

function Criar() {
  const [form, setForm] = useState({
    Nome: "",
    Email: "",
    Telefone: "",
    Inativo: "false",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setAlert({
        ...alert,
        message: "",
        type: "",
      });
    }, [500]);
  }, [alert]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function CriarCliente() {
    try {
      setIsLoading(true);
      const response = await InserirCliente(form);
      if (response.status) {
        setAlert({
          ...alert,
          type: "Success",
          message: responsJSON.parse(e.request.response).message,
        });
        router.back();
      } else {
        setAlert({
          ...alert,
          type: "Danger",
          message: responsJSON.parse(e.request.response).message,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    }
  }

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;
  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastrar Clientes</h3>
      </div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <div>
          <Input
            placeholder={"Nome do cliente"}
            icon={<FaUser />}
            name={"Nome"}
            id={"Nome"}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            placeholder={"Email do cliente"}
            icon={<MdEmail />}
            name={"Email"}
            id={"Email"}
            type={"email"}
            onChange={handleChange}
          />
        </div>
        <div>
          <MaskInput
            placeholder={"Telefone do cliente"}
            icon={<MdPhoneIphone />}
            name={"Telefone"}
            id={"Telefone"}
            mask={"(00) 00000-0000"}
            onChange={handleChange}
          />
        </div>
        <Button color={"primary"} onClick={CriarCliente}>
          Criar
        </Button>
        <Button color={"secondary"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </Suspense>
  );
}

export default Criar;
