import Api from "..";

export async function CadastrarClienteCatalogo(params) {
  const response = await Api.request.post("/CadastrarClienteCatalogo", params);

  return response;
}
