import { SelectList } from "@/Api/Controllers/Cliente";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";

export function SelectListClientes(open) {
  const [selectClientes, setSelectClientes] = useState();
  const { setIsLoading, alert, setAlert } = useContext(GlobalContext);

  useEffect(() => {
    Select();
  }, [open]);

  async function Select() {
    try {
      const response = await SelectList();
      if (response.success) {
        setSelectClientes(response);
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
    selectClientes,
    alert,
  };
}
