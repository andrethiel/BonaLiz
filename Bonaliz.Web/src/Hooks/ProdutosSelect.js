import { SelectListProduto } from "@/Api/Controllers/Produto";
import { useEffect, useState } from "react";

export function SelectListProdutos() {
  const [selectProdutos, setSelectProdutos] = useState();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    Select();
  }, []);

  async function Select() {
    try {
      const response = await SelectListProduto();
      if (response.length > 0) {
        setSelectProdutos(response);
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    }
  }

  return {
    selectProdutos,
    alert,
  };
}
