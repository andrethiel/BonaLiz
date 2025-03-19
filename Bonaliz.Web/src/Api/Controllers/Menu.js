import Api from "..";

export async function ListarMenu(role) {
  const response = await Api.request.get(`/MenuListar?role=${role}`);

  return response;
}
