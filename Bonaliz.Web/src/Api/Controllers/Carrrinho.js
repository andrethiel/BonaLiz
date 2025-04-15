import Api from "..";

export async function ListarCarrinhos() {
  const response = await Api.request.get("/ListarCarrinho");

  return response;
}
