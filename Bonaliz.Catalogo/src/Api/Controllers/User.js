import Api from "..";

export async function CadastrarClienteCatalogo(params) {
  const response = await Api.request.post("/CadastrarClienteCatalogo", params);

  return response;
}

export async function ClienteCatalogo(params) {
  const response = await Api.request.get(
    `/ObterClientePorTelefone?Telefone=${params}`
  );

  return response;
}
