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

export async function ProdutoPorGuid(props) {
  const response = await Api.request.get(`/ProdutoPorGuid?guid=${props}`);

  return response;
}

export async function LucroProduto(props) {
  const response = await Api.request.post("/ProdutoLucro", props);

  return response;
}

export async function EditarProduto(props) {
  const response = await Api.request.put("/EditarProduto", props);

  return response;
}
