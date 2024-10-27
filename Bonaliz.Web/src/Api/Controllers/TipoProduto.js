import Api from "..";

export async function ListarTipoProduto() {
  const response = await Api.request.get("/ListarTipoProduto");

  return response;
}
export async function PesquisarTipoProduto(props) {
  const response = await Api.request.post("TipoProdutoFiltar", props);

  return response;
}
export async function InserirTipoProduto(props) {
  const response = await Api.request.post("/CadastrarTipoProduto", props);

  return response;
}
export async function EditarTipoProduto(props) {
  const response = await Api.request.put("/EditarTipoProduto", props);

  return response;
}

export async function TipoProdutoPorGuid(props) {
  const response = await Api.request.get(`/TipoProdutoPorGuid?guid=${props}`);

  return response;
}

export async function SelectListTipoProduto() {
  const response = await Api.request.get("/SelectListTipoProduto");

  return response;
}
