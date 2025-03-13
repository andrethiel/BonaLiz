"use client";
import { Entrar } from "@/Api/Controllers/Login";
import { validateLoginForm } from "@/Utils/validation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState({
    Email: "",
    Senha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 1000);

    return () => clearTimeout(timer);
  }, [alert.message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was already touched
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
    const result = validateLoginForm(user);
    setErrors(result.errors);

    // Mark all fields as touched
    setTouched({ Email: true, Senha: true });

    if (!result.valid) {
      return;
    }
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
      const response = await Entrar(updatedUser);
      if (response.status) {
        console.log(response);
        router.replace("/pages/Adm");
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("nome", response.nome);
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.response.data.detail,
      });
      setUser({ Email: "", Senha: "" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        onSubmit,
        handleBlur,
        handleChange,
        user,
        errors,
        touched,
        alert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
