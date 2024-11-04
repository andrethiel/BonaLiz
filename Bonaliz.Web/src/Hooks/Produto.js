import { EditarProduto, ProdutoPorGuid } from "@/Api/Controllers/Produto";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Produtos(guid) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState({
    Nome: "",
    Id: "",
    Guid: "",
    Quantidade: "",
    FornecedorId: "",
    TipoProdutoId: "",
    precoCusto: "",
    precoVenda: "",
    Lucro: "",
    DataCompra: "",
    Inativo: "false",
    Arquivo: "",
    Imagem: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [data, setData] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Buscar();
  }, []);

  async function Buscar() {
    setIsLoading(true);
    const response = await ProdutoPorGuid(guid);
    if (response.id != 0) {
      setForm({
        ...form,
        Nome: response.nome,
        Id: response.id,
        Guid: response.guid,
        Inativo:
          response.inativo == "True" ? setChecked(true) : setChecked(false),
        Quantidade: response.quantidade,
        FornecedorId: response.fornecedorId,
        TipoProdutoId: response.tipoProdutoId,
        precoCusto: response.precoCusto,
        precoVenda: response.precoVenda,
        Lucro: response.lucro,
        Imagem: response.urlImagem,
      });

      setData({
        ...data,
        startDate: Date(response.dataCompra),
        endDate: Date(response.dataCompra),
      });
    } else {
      setAlert({
        ...alert,
        type: "Danger",
        message: "Fornecedor não encontrado",
      });
    }
    setIsLoading(false);
  }

  async function EditaProduto() {
    if (Valida()) {
      //replaceValores();
      setIsLoading(true);
      form.Inativo = checked.toString();
      form.DataCompra = dayjs(data.startDate).format("DD/MM/YYYY");
      const response = await EditarProduto(form);
      if (response.status) {
        setAlert({
          ...alert,
          type: "Success",
          message: response.message,
        });
        router.back();
      } else {
        setAlert({
          ...alert,
          type: "Danger",
          message: response.message,
        });
      }
      setIsLoading(false);
    }
  }

  function Valida() {
    if (form.Nome == "") {
      setAlert({
        ...alert,
        message: "Digite o nome do produto",
        type: "Alert",
      });
      return false;
    }
    if (form.Quantidade == "") {
      setAlert({
        ...alert,
        message: "Digite a quantidade",
        type: "Alert",
      });
      return false;
    }
    if (form.FornecedorId == "") {
      setAlert({
        ...alert,
        message: "Selecione o fornecedor do produto",
        type: "Alert",
      });
      return false;
    }
    if (form.TipoProdutoId == "") {
      setAlert({
        ...alert,
        message: "Selecione o Tipo do produto",
        type: "Alert",
      });
      return false;
    }
    if (form.precoCusto == "") {
      setAlert({
        ...alert,
        message: "Digite o valor de custo do produto",
        type: "Alert",
      });
      return false;
    }
    if (form.precoVenda == "") {
      setAlert({
        ...alert,
        message: "Digite o valor de venda do produto",
        type: "Alert",
      });
      return false;
    }
    if (data.startDate == "") {
      setAlert({
        ...alert,
        message: "Selecione a data da compra",
        type: "Alert",
      });
      return false;
    }

    return true;
  }

  function replaceValores() {
    const custo = form.precoCusto.replace(",", ".");
    const venda = form.precoVenda.replace(",", ".");
    const lucro = form.Lucro.replace(",", ".");
    console.log(custo, lucro, venda);
    setForm({ ...form, precoCusto: custo, precoVenda: venda, Lucro: lucro });
  }

  return {
    form,
    setForm,
    data,
    setData,
    alert,
    setAlert,
    isLoading,
    setIsLoading,
    EditaProduto,
    setChecked,
    checked,
    router,
  };
}
