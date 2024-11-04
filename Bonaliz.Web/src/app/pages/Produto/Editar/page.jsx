"use client";
import { LucroProduto } from "@/Api/Controllers/Produto";
import { SelectListTipoProduto } from "@/Api/Controllers/TipoProduto";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import InputMoney from "@/Components/Currency";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { SelectListFornecedor } from "@/Hooks/FornecedorSelect";
import { Produtos } from "@/Hooks/Produto";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BsTag } from "react-icons/bs";
import { FaGlobeAmericas, FaMoneyBill, FaRegFileImage } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

// import { Container } from './styles';

const Editar = () => {
  const param = useSearchParams();
  const guid = param.get("Guid");

  const {
    form,
    setForm,
    data,
    setData,
    alert,
    isLoading,
    setIsLoading,
    EditaProduto,
    setChecked,
    checked,
    router,
  } = Produtos(guid);

  const { selectFornecedor } = SelectListFornecedor();
  async function TipoProdutos() {
    const response = await SelectListTipoProduto();
    if (response.length > 0) {
      setTipoProduto(response);
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = async () => {
    if (form.precoCusto != "" && form.precoVenda != "") {
      const custo = form.precoCusto.replace(",", ".");
      const venda = form.precoVenda.replace(",", ".");
      setIsLoading(true);
      var response = await LucroProduto({
        precoCusto: custo,
        precoVenda: venda,
      });
      setForm({
        ...form,
        Lucro: response,
      });
      setIsLoading(false);
    }
  };

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
          {selectFornecedor && (
            <Select
              data={selectFornecedor}
              placeholder={"Selecione um Fornecedor"}
              icon={<FaGlobeAmericas />}
              name={"FornecedorId"}
              id={"FornecedorId"}
              onChange={handleChange}
              value={form.FornecedorId}
            />
          )}
        </div>
        {/* <div>
          <Select
            data={TipoProduto}
            placeholder={"Selecione um tipo de produto"}
            icon={<FaGlobeAmericas />}
            name={"TipoProdutoId"}
            id={"TipoProdutoId"}
            onChange={handleChange}
            value={form.TipoProdutoId}
          />
        </div> */}
        <div className="">
          <InputMoney
            placeholder={"Preço de custo"}
            icon={<FaMoneyBill />}
            name={"precoCusto"}
            id={"precoCusto"}
            onChange={(event, originalValue, maskedValue) => {
              const custo = maskedValue.replace(",", ".");
              setForm({ ...form, precoCusto: custo });
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
              const venda = maskedValue.replace(",", ".");
              setForm({ ...form, precoVenda: venda });
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
        <div className="">
          <Input
            placeholder={"Arquivo"}
            icon={<FaRegFileImage />}
            type={"file"}
            name={"Arquivo"}
            id={"Arquivo"}
            onChange={(e) => setForm({ ...form, Arquivo: e.target.files[0] })}
          />
        </div>
        {form.Imagem != "" ? (
          <div className="w-full flex mt-2">
            <div className="flex flex-row h-24 gap-10">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <span>Imagem atual</span>
                  <img src={form.Imagem} className="h-20" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {form.Arquivo && (
          <div className="w-full flex mt-2">
            <div className="flex flex-col justify-center items-center">
              <span>Nova Imagem</span>
              <img src={URL.createObjectURL(form.Arquivo)} className="h-20" />
            </div>
          </div>
        )}
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
