import Api from "..";

export async function ListarClientes() {
  const response = await Api.request.get("/ListarClientes");

  return response;
}

export async function InserirCliente(form) {
  const response = await Api.request.post("/CadastrarCliente", form);

  return response;
}

export async function EditarCliente(form) {
  const response = await Api.request.put("/EditarCliente", form);

  return response;
}

export async function ObterClienteGuid(guid) {
  const response = await Api.request.get(`/ClientePorGuid?Guid=${guid}`);

  return response;
}
export async function ClienteFiltrar(form) {
  const response = await Api.request.post("/ClienteFiltrar", form);

  return response;
}

export async function SelectList() {
  let lista = [];
  const response = await Api.request.get("/SelectListClientes");

  response.map((item) => {
    lista.push({ value: item.value, label: item.text });
  });

  return lista;
}
