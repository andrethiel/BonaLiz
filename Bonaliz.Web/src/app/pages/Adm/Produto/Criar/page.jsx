"use client";
import { SelectListForncedor } from "@/Api/Controllers/Forncedor";
import { CadastrarProduto, LucroProduto } from "@/Api/Controllers/Produto";
import { SelectListTipoProduto } from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import InputMoney from "@/Components/Currency";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import ImageArquivo from "@/Components/Image";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { BsTag } from "react-icons/bs";
import { FaGlobeAmericas, FaMoneyBill, FaRegFileImage } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Criar = () => {
  useEffect(() => {
    Fornecedores();
  }, []);
  async function Fornecedores() {
    try {
      const response = await SelectListForncedor();
      if (response.length > 0) {
        setFornecedor(response);
        TipoProdutos();
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: e.message,
      });
    }
  }
  async function TipoProdutos() {
    const response = await SelectListTipoProduto();
    if (response.length > 0) {
      setTipoProduto(response);
    }
  }
  async function CriarProduto() {
    if (Valida()) {
      setIsLoading(true);
      form.dataCompra = dayjs(data.startDate).format("DD/MM/YYYY");
      const response = await CadastrarProduto(form);

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
    setTimeout(() => {
      setAlert({
        ...alert,
        type: "",
        message: "",
      });
    }, 500);
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

  const [form, setForm] = useState({
    Nome: "",
    Quantidade: "",
    FornecedorId: "",
    TipoProdutoId: "",
    precoCusto: "",
    precoVenda: "",
    Lucro: "",
    dataCompra: "",
    Inativo: "false",
    Arquivo: [],
  });

  const [arquivo, setArquivo] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [Fornecedor, setFornecedor] = useState([]);
  const [TipoProduto, setTipoProduto] = useState([]);
  const [data, setData] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = async () => {
    if (form.precoCusto != "" && form.precoVenda != "") {
      setIsLoading(true);
      var response = await LucroProduto(form);
      setForm({
        ...form,
        Lucro: response,
      });
      setIsLoading(false);
    }
  };

  function Image(event) {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setArquivo((imagem) => imagem.concat(fileArray));
      // Array.from(event.target.file).map((file) => URL.revokeObjectURL(file));
    }
  }
  function handleRemovePhotoFile(file) {
    const filter = arquivo.filter((filter) => filter != file);
    setArquivo(filter);
  }

  function renderImage(image) {
    return image.map((arquivoImagem) => {
      return (
        <ImageArquivo arquivo={arquivoImagem} onClick={handleRemovePhotoFile} />
      );
    });
  }

  return (
    <Suspense>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      <div className={`${isLoading && "hidden"} w-full`}>
        <div className="p-3 m-3">
          <h3 className="text-2xl font-semibold">Cadastro de Produtos</h3>
        </div>

        {alert && <Alert type={alert.type}>{alert.message}</Alert>}
        <div className="grid gap-4">
          <div className="">
            <Input
              placeholder={"Nome do produto"}
              icon={<BsTag />}
              name={"Nome"}
              id={"Nome"}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <Input
              placeholder={"Quantidade"}
              icon={<MdOutlineProductionQuantityLimits />}
              name={"Quantidade"}
              id={"Quantidade"}
              onChange={handleChange}
              value={form.Quantidade}
            />
          </div>
          <div>
            <Select
              data={Fornecedor}
              placeholder={"Selecione um Fornecedor"}
              icon={<FaGlobeAmericas />}
              name={"FornecedorId"}
              id={"FornecedorId"}
              onChange={handleChange}
              value={form.FornecedorId}
            />
          </div>
          <div>
            <Select
              data={TipoProduto}
              placeholder={"Selecione um tipo de produto"}
              icon={<FaGlobeAmericas />}
              name={"TipoProdutoId"}
              id={"TipoProdutoId"}
              onChange={handleChange}
              value={form.TipoProdutoId}
            />
          </div>
          <div className="">
            <InputMoney
              placeholder={"Preço de custo"}
              icon={<FaMoneyBill />}
              name={"precoCusto"}
              id={"precoCusto"}
              onChange={(event, originalValue, maskedValue) =>
                setForm({ ...form, precoCusto: maskedValue })
              }
              value={form.precoCusto}
            />
          </div>
          <div className="">
            <InputMoney
              placeholder={"Preço de venda"}
              icon={<FaMoneyBill />}
              name={"precoVenda"}
              id={"precoVenda"}
              onChange={(event, originalValue, maskedValue) =>
                setForm({ ...form, precoVenda: maskedValue })
              }
              value={form.precoVenda}
              onBlur={handleBlur}
            />
          </div>
          <div className="">
            <Input
              placeholder={"Lucro"}
              icon={<FaMoneyBill />}
              name={"Lucro"}
              id={"Lucro"}
              value={form.Lucro}
              disabled={true}
            />
          </div>
          <div className="">
            <DataPicker
              onChange={(newValue) => {
                setData(newValue);
              }}
              value={data}
              placeholder="Selecione a data da compra"
            />
          </div>
          <div className="">
            <input
              type="file"
              multiple
              placeholder="Arquivo"
              onChange={Image}
              accept="image/*"
            />
            {/* <Input
              placeholder={"Arquivo"}
              icon={<FaRegFileImage />}
              type={"file"}
              name={"Arquivo"}
              id={"Arquivo"}
              onChange={(e) => setForm({ ...form, Arquivo: e.target.files[0] })}
            /> */}
          </div>
          <div className="w-full flex mt-2">{renderImage(arquivo)}</div>

          <Button color={"primary"} onClick={CriarProduto}>
            Criar
          </Button>
          <Button color={"secondary"} onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default Criar;
