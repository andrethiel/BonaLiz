"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Check from "@/Components/Check";
import InputMoney from "@/Components/Currency";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import Drop from "@/Components/Drop";
import ImageArquivo from "@/Components/Image";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { GlobalContext } from "@/Hooks/GlobalState";
import { ProdutoContext } from "@/Hooks/Produto";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect } from "react";

const Editar = () => {
  const param = useSearchParams();
  const guid = param.get("Guid");

  const {
    form,
    EditaProduto,
    setChecked,
    checked,
    router,
    Buscar,
    handleChange,
    Fornecedor,
    TipoProduto,
    handleBlur,
    setForm,
    Voltar,
    show,
    setShow,
  } = useContext(ProdutoContext);

  const { isLoading, alert } = useContext(GlobalContext);

  useEffect(() => {
    Buscar(guid);
  }, [guid]);

  return (
    <Suspense>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      <div className={`${isLoading && "hidden"} w-full`}>
        <div className="p-3 m-3">
          <h3 className="text-2xl font-semibold">Editar produto</h3>
        </div>
        {isLoading && <CustomLoading loadingMessage="Aguarde" />}
        {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
        <div className="grid gap-4">
          <input name={"Id"} id={"Id"} value={form.Id} type="hidden" />
          <input name={"guid"} id={"guid"} value={form.Guid} type="hidden" />
          <div className="">
            <Input
              placeholder={"Nome do produto"}
              icon={"tag"}
              name={"Nome"}
              id={"Nome"}
              onChange={handleChange}
              value={form.Nome}
            />
          </div>
          <div className="">
            <Input
              placeholder={"Quantidade"}
              icon={"arrow-down-0-1"}
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
              icon={"globe"}
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
              icon={"globe"}
              name={"TipoProdutoId"}
              id={"TipoProdutoId"}
              onChange={handleChange}
              value={form.TipoProdutoId}
            />
          </div>
          <div className="">
            <InputMoney
              placeholder={"Preço de custo"}
              icon={"badge-dollar-sign"}
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
              icon={"badge-dollar-sign"}
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
              icon={"badge-dollar-sign"}
              name={"Lucro"}
              id={"Lucro"}
              value={form.Lucro}
              disabled={true}
            />
          </div>
          <div className="">
            <DataPicker
              onChange={handleChange}
              value={form.DataCompra}
              show={show}
              setIsOpen={() => setShow(false)}
              onFocus={() => setShow(true)}
            />
          </div>
          <Drop arquivos={form.Imagem} />
          <div>
            <Check
              onChange={(e) => setChecked(e.target.checked)}
              value={checked}
            >
              Inativo
            </Check>
          </div>
          <Button color={"primary"} onClick={EditaProduto}>
            Editar
          </Button>
          <Button color={"secondary"} onClick={Voltar}>
            Voltar
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default Editar;
