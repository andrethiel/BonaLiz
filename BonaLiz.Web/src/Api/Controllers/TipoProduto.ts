import Api from "..";

export async function ListarTipoProduto<ApiResponse>() {
  const response = await Api.request.get<ApiResponse>("/ListarTipoProduto");

  return response;
}
export async function PesquisarTipoProduto<ApiResponse>(props: TipoProduto) {
  const response = await Api.request.post<ApiResponse>(
    "TipoProdutoFiltar",
    props
  );

  return response;
}
export async function InserirTipoProduto<ApiResponse>(props: TipoProduto) {
  const response = await Api.request.post<ApiResponse>(
    "/CadastrarTipoProduto",
    props
  );

  return response;
}
export async function EditarTipoProduto<ApiResponse>(props: TipoProduto) {
  const response = await Api.request.post<ApiResponse>(
    "/EditarTipoProduto",
    props
  );

  return response;
}

export async function TipoProdutoPorGuid<ApiResponse>(props: string) {
  const response = await Api.request.get<ApiResponse>(
    `/TipoProdutoPorGuid?guid=${props}`
  );

  return response;
}
