import { SelectList } from "@/Api/Controllers/Cliente";
import { useEffect, useState } from "react";

export function SelectListClientes(open) {
  const [selectClientes, setSelectClientes] = useState();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    Select();
  }, [open]);

  async function Select() {
    try {
      const response = await SelectList();
      if (response.length > 0) {
        setSelectClientes(response);
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
    selectClientes,
    alert,
  };
}
