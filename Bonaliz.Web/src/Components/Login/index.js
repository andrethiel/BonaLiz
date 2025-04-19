"use client";
import React, { useContext } from "react";
import Input from "../Input";
import Button from "../Button";
import Alert from "../Alert";
import CustomLoading from "../CustomLoadingGrid";
import Link from "next/link";
import { AuthContext } from "@/Hooks/Login";
import { images } from "@/constants";
import Image from "next/image";
import { GlobalContext } from "@/Hooks/GlobalState";
import Linked from "../Link";

function Login() {
  const { onSubmit, handleBlur, handleChange, user, errors, touched } =
    useContext(AuthContext);

  const { isLoading, alert } = useContext(GlobalContext);

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div className="min-h-screen flex flex-col justify-center pb-12">
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image className="mx-auto h-36 w-auto" src={images.Logo} alt="" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Faça login na sua conta
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            onSubmit={onSubmit}
            className="mt-1 relative gap-6 flex flex-col"
          >
            <div>
              <Input
                placeholder={"Email"}
                name={"Email"}
                autoComplete="email"
                icon={"at-sign"}
                value={user.Email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
              />
              {errors.email && touched.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                placeholder={"Senha"}
                type={"password"}
                name={"Senha"}
                icon={"lock"}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.password && touched.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
              />
              {errors.password && touched.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Button color={"primary"} type={"submit"}>
                Entrar
              </Button>
            </div>
          </form>
          <div className="flex flex-col mt-4">
            <Link href={"#"} className="ml-auto">
              Esqueci a senha
            </Link>
            <div className="mt-4 border-t">
              <div className="mt-8">
                <Button>Criar conta</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
