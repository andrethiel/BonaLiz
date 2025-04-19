import { createApi } from "..";

export async function ListarMenu(role) {
  const Api = createApi();
  const response = await Api.get(`/MenuListar?role=${role}`);

  return response;
}
