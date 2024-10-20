import Api from "..";

export async function ListarFornecedor() {
  const response = await Api.request.get("/ListarForncedor");

  return response;
}

export async function InserirFornecedor(props) {
  const response = await Api.request.post("/CadastrarForncedor", props);

  return response;
}

export async function EditarFornecedor(props) {
  const response = await Api.request.put("/EditarForncedor", props);

  return response;
}

export async function ObterFornecedorGuid(props) {
  const response = await Api.request.get(`/ForncedorPorGuid?guid=${props}`);

  return response;
}

export async function PesquisarFornecedor(props) {
  const response = await Api.request.post("ForncedorFiltar", props);

  return response;
}

export async function SelectListForncedor() {
  const response = await Api.request.get("/SelectListForncedor");

  return response;
}
