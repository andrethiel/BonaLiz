import { useEffect, useState } from "react";

export function useAlert(timeout = 3000) {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!alert.message) return;

    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, timeout);

    return () => clearTimeout(timer);
  }, [alert.message, timeout]);

  return { alert, setAlert };
}
