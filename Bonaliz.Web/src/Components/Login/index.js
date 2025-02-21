"use client";
import React from "react";
import Input from "../Input";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import Button from "../Button";
import { LoginEntrar } from "@/Hooks/Login";
import Alert from "../Alert";
import CustomLoading from "../CustomLoadingGrid";

function Login() {
  const { user, setUser, EntrarLogin, alert, isLoading } = LoginEntrar();

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="mt-1 relative gap-6 flex flex-col">
          <div>
            <Input
              placeholder={"Usuário"}
              icon={<FaRegUserCircle />}
              onChange={(e) => setUser({ ...user, Usuario: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder={"Senha"}
              type={"password"}
              icon={<MdOutlinePassword />}
              onChange={(e) => setUser({ ...user, Senha: e.target.value })}
            />
          </div>
          <div>
            <Button onClick={EntrarLogin} color={"primary"}>
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
