import { ListarClientes } from "@/Api/Controllers/Cliente";
import { useEffect, useState } from "react";

export function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    Nome: "",
    Email: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Listar();
  }, []);

  async function Listar() {
    setIsLoading(true);
    try {
      const response = await ListarClientes();
      if (response.length > 0) {
        setClientes(response);
      } else {
        setClientes([]);
        setAlert({
          ...alert,
          type: "Danger",
          message: "Nenhum cliente encontrado",
        });
      }
      setIsLoading(false);
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
  }

  return {
    clientes,
    isLoading,
    alert,
    setForm,
  };
}
