"use client";
import { EditarCliente, ObterClienteGuid } from "@/Api/Controllers/Cliente";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import MaskInput from "@/Components/InputMask";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPhoneIphone } from "react-icons/md";

function Editar() {
  const param = useSearchParams();
  const guid = param.get("Guid");
  const [form, setForm] = useState({
    Id: "",
    Guid: "",
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
  const [checked, setChecked] = useState(false);
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

  useEffect(() => {
    Buscar();
  }, []);

  async function Buscar() {
    setIsLoading(true);
    const response = await ObterClienteGuid(guid);
    if (response.id != 0) {
      setForm({
        ...form,
        Nome: response.nome,
        Email: response.email,
        Telefone: response.telefone,
        Id: response.id,
        Guid: response.guid,
        Inativo:
          response.inativo == "True" ? setChecked(true) : setChecked(false),
      });
    }
    setIsLoading(false);
  }

  async function ClienteEditar() {
    setIsLoading(true);
    form.Inativo = checked.toString();
    const response = await EditarCliente(form);
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
  }

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <Suspense fallback={<CustomLoading loadingMessage="Aguarde" />}>
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastrar Clientes</h3>
      </div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <input name={"Id"} id={"Id"} type="hidden" value={form.Id} />
        <input name={"guid"} id={"guid"} type="hidden" value={form.Guid} />
        <div>
          <Input
            placeholder={"Nome do cliente"}
            icon={<FaUser />}
            name={"Nome"}
            id={"Nome"}
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
            value={form.Nome}
          />
        </div>
        <div>
          <Input
            placeholder={"Email do cliente"}
            icon={<MdEmail />}
            name={"Email"}
            id={"Email"}
            type={"email"}
            value={form.Email}
            onChange={(e) => setForm({ ...form, Email: e.target.value })}
          />
        </div>
        <div>
          <MaskInput
            placeholder={"Telefone do cliente"}
            icon={<MdPhoneIphone />}
            name={"Telefone"}
            id={"Telefone"}
            mask={"(00) 00000-0000"}
            value={form.Telefone}
            onChange={(e) => setForm({ ...form, Telefone: e.target.value })}
          />
        </div>
        <Check onChange={(e) => setChecked(e.target.checked)} value={checked}>
          Inativo
        </Check>
        <Button color={"primary"} onClick={ClienteEditar}>
          Editar
        </Button>
        <Button color={"secondary"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </Suspense>
  );
}

export default Editar;
