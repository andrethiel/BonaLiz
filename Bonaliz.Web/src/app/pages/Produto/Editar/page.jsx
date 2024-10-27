"use client";
import { SelectListForncedor } from "@/Api/Controllers/Forncedor";
import {
  EditarProduto,
  LucroProduto,
  ProdutoPorGuid,
} from "@/Api/Controllers/Produto";
import { SelectListTipoProduto } from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import InputMoney from "@/Components/Currency";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsTag } from "react-icons/bs";
import { FaGlobeAmericas, FaMoneyBill } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

// import { Container } from './styles';

const Editar = () => {
  const param = useSearchParams();

  async function Buscar() {
    setIsLoading(true);
    const response = await ProdutoPorGuid(param.get("Guid"));
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

  useEffect(() => {
    Fornecedores();
    Buscar();
  }, []);

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
  const router = useRouter();

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
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

  async function EditaProduto() {
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

  if (isLoading) return <CustomLoading loadingMessage="Aguarde" />;

  return (
    <div className="w-full">
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Produtos</h3>
      </div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="grid gap-4">
        <input name={"Id"} id={"Id"} value={form.Id} type="hidden" />
        <input name={"guid"} id={"guid"} value={form.Guid} type="hidden" />
        <div className="">
          <Input
            placeholder={"Nome do produto"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
            onChange={handleChange}
            value={form.Nome}
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
            onChange={(event, originalValue, maskedValue) => {
              setForm({ ...form, precoCusto: maskedValue });
            }}
            value={form.precoCusto}
          />
        </div>
        <div className="">
          <InputMoney
            placeholder={"Preço de venda"}
            icon={<FaMoneyBill />}
            name={"precoVenda"}
            id={"precoVenda"}
            onChange={(event, originalValue, maskedValue) => {
              setForm({ ...form, precoVenda: maskedValue });
            }}
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
        <div>
          <Check onChange={(e) => setChecked(e.target.checked)} value={checked}>
            Inativo
          </Check>
        </div>
        <Button color={"primary"} onClick={EditaProduto}>
          Editar
        </Button>
        <Button color={"secondary"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default Editar;
