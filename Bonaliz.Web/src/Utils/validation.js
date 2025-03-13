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
  console.log(values);
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

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
