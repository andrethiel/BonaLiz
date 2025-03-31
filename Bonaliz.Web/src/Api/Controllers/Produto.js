import Api from "..";

export async function ListarProdutos() {
  const response = await Api.request.get("/ListarProdutos");

  return response;
}

export async function ListarProdutosPrincal() {
  const response = await Api.request.get("/ListaPrincipal");

  return response;
}

export async function FiltrarProdutos(props) {
  console.log(props);
  const response = await Api.request.post("/ProdutoFiltar", props);

  return response;
}

export async function CadastrarProduto(props) {
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

  const response = await Api.request.postForm("/CadastrarProduto", form);

  return response;
}

export async function ProdutoPorGuid(props) {
  const response = await Api.request.get(`/ProdutoPorGuid?guid=${props}`);

  return response;
}

export async function LucroProduto(props) {
  const response = await Api.request.get(
    `/ProdutoLucro?PrecoVenda=${props.precoCusto}&PrecoCusto=${props.precoVenda}`
  );

  return response;
}

export async function EditarProduto(props) {
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
      form.append(`Arquivo`, file); // Não precisa do índice na chave, apenas no backend
    });
  }

  const response = await Api.request.putForm("/EditarProduto", form);

  return response;
}

export async function SelectListProduto() {
  let lista = [];
  const response = await Api.request.get("/SelectListProdutos");

  response.map((item) => {
    lista.push({ value: item.value, label: item.text });
  });

  return lista;
}
