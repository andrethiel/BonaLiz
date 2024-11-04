import { SelectListForncedor } from "@/Api/Controllers/Forncedor";
import { useEffect, useState } from "react";

export function SelectListFornecedor() {
  const [selectFornecedor, setSelectFornecedor] = useState();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    Select();
  }, []);

  async function Select() {
    try {
      const response = await SelectListForncedor();
      if (response.length > 0) {
        setSelectFornecedor(response);
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
    selectFornecedor,
    alert,
  };
}
