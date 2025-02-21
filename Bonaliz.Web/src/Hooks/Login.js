import { Entrar } from "@/Api/Controllers/Login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginEntrar() {
  const router = useRouter();
  const [user, setUser] = useState({
    Usuario: "",
    Senha: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAlert({
        ...alert,
        message: "",
        type: "",
      });
    }, [500]);
  }, [alert]);

  async function EntrarLogin() {
    if (user.Usuario == "") {
      setAlert({
        ...alert,
        message: "Digite o usuário",
        type: "Alert",
      });
      return;
    }

    if (user.Senha == "") {
      setAlert({
        ...alert,
        message: "Digite a senha",
        type: "Alert",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await Entrar(user);
      if (!response.status) {
        setAlert({
          ...alert,
          message: response.message,
          type: "Danger",
        });
      } else {
        router.replace("/pages/Adm/Principal");
      }
      setIsLoading(false);
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
      setIsLoading(false);
    }
  }

  return {
    user,
    setUser,
    EntrarLogin,
    alert,
    isLoading,
    setIsLoading,
  };
}
