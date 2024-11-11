import { SelectListTipoProduto } from "@/Api/Controllers/TipoProduto";
import { useEffect, useState } from "react";

export function listTipoProduto() {
  const [selectTipoProduto, setSelectTipoProduto] = useState();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    Select();
  }, []);

  async function Select() {
    try {
      const response = await SelectListTipoProduto();
      if (response.length > 0) {
        setSelectTipoProduto(response);
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
  }

  return {
    selectTipoProduto,
    alert,
  };
}
