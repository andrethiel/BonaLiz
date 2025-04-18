import { createApi } from "..";

export async function ListarProdutos(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ListarProdutos");

  return response;
}

export async function ListarProdutosPrincal(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ListaPrincipal");

  return response;
}

export async function FiltrarProdutos(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/ProdutoFiltar", props);

  return response;
}

export async function CadastrarProduto(props, tenantId) {
  const Api = createApi(tenantId);
  const form = new FormData();
  form.append("Nome", props.Nome);
  form.append("TipoProdutoId", props.TipoProdutoId);
  form.append("FornecedorId", props.FornecedorId);
  form.append("PrecoCusto", props.precoCusto);
  form.append("PrecoVenda", props.precoVenda);
  form.append("Lucro", props.Lucro);
  form.append("DataCompra", props.DataCompra);
  form.append("Quantidade", props.Quantidade);
  form.append("Inativo", props.Inativo);
  if (props.Arquivo.length > 0) {
    props.Arquivo.forEach((file, index) => {
      form.append(`Arquivo`, file);
    });
  }

  const response = await Api.postForm("/CadastrarProduto", form);

  return response;
}

export async function ProdutoPorGuid(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get(`/ProdutoPorGuid?guid=${props}`);

  return response;
}

export async function LucroProduto(props) {
  const Api = createApi();
  const response = await Api.get(
    `/ProdutoLucro?PrecoVenda=${props.precoCusto}&PrecoCusto=${props.precoVenda}`
  );

  return response;
}

export async function EditarProduto(props, tenantId) {
  const Api = createApi(tenantId);
  const form = new FormData();
  form.append("Id", props.Id);
  form.append("Guid", props.Guid);
  form.append("Nome", props.Nome);
  form.append("TipoProdutoId", props.TipoProdutoId);
  form.append("FornecedorId", props.FornecedorId);
  form.append("PrecoCusto", props.precoCusto);
  form.append("PrecoVenda", props.precoVenda);
  form.append("Lucro", props.Lucro);
  form.append("DataCompra", props.DataCompra);
  form.append("Quantidade", props.Quantidade);
  form.append("Inativo", props.Inativo);
  if (props.Imagem.length > 0) {
    form.append("Imagem", JSON.stringify(props.Imagem));
  }
  if (props.Arquivo.length > 0) {
    props.Arquivo.forEach((file, index) => {
      form.append(`Arquivo`, file);
    });
  }

  const response = await Api.putForm("/EditarProduto", form);

  return response;
}

export async function SelectListProduto(tenantId) {
  const Api = createApi(tenantId);
  let lista = [];
  const response = await Api.get("/SelectListProdutos");

  response.data.map((item) => {
    lista.push({ value: item.value, label: item.text });
  });
  lista.unshift({ value: "", label: "Selecione uma opção" });
  return lista;
}
