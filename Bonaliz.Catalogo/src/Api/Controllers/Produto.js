import Api from "..";

export async function ListarProdutosPrincal() {
  const response = await Api.request.get("/Listar");

  return response;
}

export async function SelectListTipoProduto() {
  const response = await Api.request.get("/TipoProdutoSelectList");
  return response;
}

export async function Filtrar(params) {
  const response = await Api.request.post("/FiltarTipoProdutoId", {
    TipoProdutoId: params,
  });

  return response;
}
