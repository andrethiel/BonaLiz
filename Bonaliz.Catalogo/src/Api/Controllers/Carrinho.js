import Api from "..";

export async function CarrinhoInserir(params) {
  const response = await Api.request.post("/Inserir", params);

  return response;
}

export async function UpdateQuantidade(params) {
  const response = await Api.request.post("/UpdateQuantidade", params);

  return response;
}

export async function Remover(params) {
  const response = await Api.request.post("/Removeritem", params);

  return response;
}
