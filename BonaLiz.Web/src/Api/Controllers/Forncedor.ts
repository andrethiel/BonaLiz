import Api from "..";

export async function ListarFornecedor<ApiResponse>() {
  const response = await Api.request.get<ApiResponse>("/ListarForncedor");

  return response;
}

export async function InserirFornecedor<ApiResponse>(props: Fornecedor) {
  const response = await Api.request.post<ApiResponse>(
    "/CadastrarForncedor",
    props
  );

  return response;
}

export async function EditarFornecedor<ApiResponse>(props: Fornecedor) {
  const response = await Api.request.post<ApiResponse>(
    "/EditarForncedor",
    props
  );

  return response;
}

export async function ObterFornecedorGuid<ApiResponse>(props: string) {
  const response = await Api.request.get<ApiResponse>(
    `/ForncedorPorGuid?guid=${props}`
  );

  return response;
}

export async function PesquisarFornecedor<ApiResponse>(props: Fornecedor) {
  const response = await Api.request.post<ApiResponse>(
    "ForncedorFiltar",
    props
  );

  return response;
}
