import Api from "..";

export async function ListarProdutos() {
  const response = await Api.request.get("/ListarProdutos");

  return response;
}

export async function FiltrarProdutos(props) {
  const response = await Api.request.post("/ProdutoFiltar", props);

  return response;
}

export async function CadastrarProduto(props) {
  const response = await Api.request.post("/CadastrarProduto", props);

  return response;
}
