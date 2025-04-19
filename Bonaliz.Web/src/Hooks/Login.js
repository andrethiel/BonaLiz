"use client";
import { Entrar, Logout } from "@/Api/Controllers/Login";
import { validateLoginForm } from "@/Utils/validation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState({
    Email: "",
    Senha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});
  const { setIsLoading, alert, setAlert, tenant } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const result = validateLoginForm({ ...user, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: result.errors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const result = validateLoginForm(user);
    setErrors((prev) => ({ ...prev, [name]: result.errors[name] }));
  };

  async function onSubmit(e) {
    e.preventDefault();

    // Validate all fields on submit
    // const result = validateLoginForm(user);
    // setErrors(result.errors);

    // // Mark all fields as touched
    // setTouched({ Email: true, Senha: true });

    // if (!result.valid) {
    //   return;
    // }
    setIsLoading(true);
    setUser((prevUser) => {
      const updatedUser = { ...prevUser };
      EntrarLogin(updatedUser);
      return updatedUser;
    });
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function EntrarLogin(updatedUser) {
    try {
      localStorage.clear();
      const response = await Entrar(updatedUser, tenant);
      if (response.status) {
        localStorage.setItem("nome", response.nome);
        localStorage.setItem("email", response.email);
        localStorage.setItem("role", response.role);
        router.replace("/pages/Adm");
      }
    } catch (e) {
      console.log(e);
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
      setUser({ Email: "", Senha: "" });
    } finally {
      setIsLoading(false);
    }
  }

  async function sair() {
    await Logout(tenant);
    localStorage.clear();
    router.replace("/");
  }

  return (
    <AuthContext.Provider
      value={{
        onSubmit,
        handleBlur,
        handleChange,
        user,
        errors,
        touched,
        sair,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
