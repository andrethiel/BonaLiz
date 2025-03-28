function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  return passwordRegex.test(password);
}
export function validateLoginForm(values) {
  const errors = {};

  // Validate email
  if (values.Email == "") {
    errors.email = { message: "Digite um e-mail" };
  } else if (!isValidEmail(values.Email)) {
    errors.email = { message: "Deve ser um e-mail válido" };
  }

  // Validate password
  // if (values.Senha == "") {
  //   errors.password = { message: "Digite a senha" };
  // } else if (!isValidPassword(values.Senha)) {
  //   errors.password = {
  //     message:
  //       "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e pelo menos um caractere especial",
  //   };
  // }

  // function Valida() {
  //   if (form.Nome == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o nome do fornecedor",
  //       type: "Danger",
  //     });
  //     return false;
  //   }
  //   if (form.CNPJ == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o CNPJ do fornecedor",
  //       type: "Danger",
  //     });
  //     return false;
  //   }
  //   if (form.Estado == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Selecione o estado do fornecedor",
  //       type: "Danger",
  //     });
  //     return false;
  //   }

  //   return true;
  // }

  // function Valida() {
  //   if (form.Nome == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o nome do fornecedor",
  //       type: "Danger",
  //     });
  //     return false;
  //   }
  //   if (form.CNPJ == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o CNPJ do fornecedor",
  //       type: "Danger",
  //     });
  //     return false;
  //   }
  //   if (form.Estado == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Selecione o estado do fornecedor",
  //       type: "Danger",
  //     });
  //     return false;
  //   }

  //   return true;
  // }

  // function Valida() {
  //   if (form.Nome == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o nome do fornecedor",
  //       type: "Danger",
  //     });
  //     return false;
  //   }

  //   return true;
  // }

  // function Valida() {
  //   if (form.Nome == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o nome do produto",
  //       type: "Alert",
  //     });
  //     return false;
  //   }
  //   if (form.Quantidade == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite a quantidade",
  //       type: "Alert",
  //     });
  //     return false;
  //   }
  //   if (form.FornecedorId == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Selecione o fornecedor do produto",
  //       type: "Alert",
  //     });
  //     return false;
  //   }
  //   if (form.TipoProdutoId == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Selecione o Tipo do produto",
  //       type: "Alert",
  //     });
  //     return false;
  //   }
  //   if (form.precoCusto == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o valor de custo do produto",
  //       type: "Alert",
  //     });
  //     return false;
  //   }
  //   if (form.precoVenda == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Digite o valor de venda do produto",
  //       type: "Alert",
  //     });
  //     return false;
  //   }
  //   if (data.startDate == "") {
  //     setAlert({
  //       ...alert,
  //       message: "Selecione a data da compra",
  //       type: "Alert",
  //     });
  //     return false;
  //   }

  //   return true;
  // }

  // function Valida() {
  //     if (form.Nome == "") {
  //       setAlert({
  //         ...alert,
  //         message: "Digite o nome do produto",
  //         type: "Alert",
  //       });
  //       return false;
  //     }
  //     if (form.Quantidade == "") {
  //       setAlert({
  //         ...alert,
  //         message: "Digite a quantidade",
  //         type: "Alert",
  //       });
  //       return false;
  //     }
  //     if (form.FornecedorId == "") {
  //       setAlert({
  //         ...alert,
  //         message: "Selecione o fornecedor do produto",
  //         type: "Alert",
  //       });
  //       return false;
  //     }
  //     if (form.TipoProdutoId == "") {
  //       setAlert({
  //         ...alert,
  //         message: "Selecione o Tipo do produto",
  //         type: "Alert",
  //       });
  //       return false;
  //     }
  //     if (form.precoCusto == "") {
  //       setAlert({
  //         ...alert,
  //         message: "Digite o valor de custo do produto",
  //         type: "Alert",
  //       });
  //       return false;
  //     }
  //     if (form.precoVenda == "") {
  //       setAlert({
  //         ...alert,
  //         message: "Digite o valor de venda do produto",
  //         type: "Alert",
  //       });
  //       return false;
  //     }
  //     if (data.startDate == "") {
  //       setAlert({
  //         ...alert,
  //         message: "Selecione a data da compra",
  //         type: "Alert",
  //       });
  //       return false;
  //     }

  //     return true;
  //   }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
