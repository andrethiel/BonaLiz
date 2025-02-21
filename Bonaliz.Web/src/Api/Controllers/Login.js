import Api from "..";

export async function Entrar(form) {
  const response = await Api.request.post("/Login", form);

  return response;
}
