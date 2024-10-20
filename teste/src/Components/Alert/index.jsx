import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = ({ children, type }) => {
  const MySwal = withReactContent(Swal);

  function Sucesso() {
    return MySwal.fire({
      title: <p>Sucesso</p>,
      text: `${children}`,
      icon: "success",
      confirmButtonText: "Ok",
      timer: 2000,
    });
  }
  function Erro() {
    return MySwal.fire({
      title: <p>Erro</p>,
      text: `${children}`,
      icon: "error",
      confirmButtonText: "Ok",
      timer: 2000,
    });
  }

  function Atencao() {
    return MySwal.fire({
      title: <p>Atenção</p>,
      text: `${children}`,
      icon: "info",
      confirmButtonText: "Ok",
      timer: 2000,
    });
  }

  switch (type) {
    case "Danger":
      Erro();
      break;
    case "Success":
      Sucesso();
      break;
    case "Alert":
      Atencao();
      break;
  }
};

export default Alert;
