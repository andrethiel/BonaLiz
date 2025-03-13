import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = ({ children, type }) => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (!type) return;

    switch (type) {
      case "Danger":
        MySwal.fire({
          title: <p>Erro</p>,
          text: `${children}`,
          icon: "error",
          confirmButtonText: "Ok",
          timer: 2000,
        });
        break;
      case "Success":
        MySwal.fire({
          title: <p>Sucesso</p>,
          text: `${children}`,
          icon: "success",
          confirmButtonText: "Ok",
          timer: 2000,
        });
        break;
      case "Alert":
        MySwal.fire({
          title: <p>Atenção</p>,
          text: `${children}`,
          icon: "info",
          confirmButtonText: "Ok",
          timer: 2000,
        });
        break;
    }
  }, [type, children]);

  return null;
};

export default Alert;
