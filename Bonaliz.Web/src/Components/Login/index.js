"use client";
import React, { useContext } from "react";
import Input from "../Input";
import Button from "../Button";
import Alert from "../Alert";
import CustomLoading from "../CustomLoadingGrid";
import Link from "next/link";
import { AuthContext } from "@/Hooks/Login";

function Login() {
  const {
    isLoading,
    setIsLoading,
    onSubmit,
    handleBlur,
    handleChange,
    user,
    errors,
    touched,
    alert,
  } = useContext(AuthContext);
  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={onSubmit} className="mt-1 relative gap-6 flex flex-col">
          <div>
            <Input
              placeholder={"Email"}
              name={"Email"}
              type="email"
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

            <Link href={"/pages/Adm"}>entrar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
