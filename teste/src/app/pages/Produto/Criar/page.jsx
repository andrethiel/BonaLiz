"use client";
import { SelectListForncedor } from "@/Api/Controllers/Forncedor";
import { CadastrarProduto } from "@/Api/Controllers/Produto";
import { SelectListTipoProduto } from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsTag } from "react-icons/bs";
import { FaGlobeAmericas, FaMoneyBill } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Criar = () => {
  const router = useRouter();
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
    if (data.startDate != null) {
      setForm({
        ...form,
        DataCompra: dayjs(data.startDate).format("DD/MM/YYYY"),
      });
    }
    const response = await CadastrarProduto(form);
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
    Inativo: "False",
  });
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

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name == "precoVenda" && form.precoCusto != "") {
      setForm({ ...form, Lucro: value - parseFloat(form.precoCusto) });
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div className="w-full">
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
          <Input
            placeholder={"Preço de custo"}
            icon={<FaMoneyBill />}
            name={"precoCusto"}
            id={"precoCusto"}
            onChange={handleChange}
            value={form.precoCusto}
          />
        </div>
        <div className="">
          <Input
            placeholder={"Preço de venda"}
            icon={<FaMoneyBill />}
            name={"precoVenda"}
            id={"precoVenda"}
            onChange={handleChange}
            value={form.precoVenda}
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
        <Button color={"primary"} onClick={CriarProduto}>
          Criar
        </Button>
        <Button color={"secondary"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default Criar;
