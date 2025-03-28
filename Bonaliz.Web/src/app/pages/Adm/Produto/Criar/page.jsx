"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import InputMoney from "@/Components/Currency";
import CustomLoading from "@/Components/CustomLoadingGrid";
import DataPicker from "@/Components/DatePicker";
import ImageArquivo from "@/Components/Image";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { ProdutoContext } from "@/Hooks/Produto";
import React, { Suspense, useContext } from "react";

const Criar = () => {
  const {
    alert,
    Fornecedor,
    isLoading,
    form,
    setForm,
    handleChange,
    TipoProduto,
    handleBlur,
    CriarProduto,
    arquivo,
    setArquivo,
    router,
    fileInputRef,
    Voltar,
  } = useContext(ProdutoContext);

  function Image(event) {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));

    setArquivo((prev) => [...prev, ...fileURLs]);
    setForm((prevForm) => ({
      ...prevForm,
      Arquivo: [...prevForm.Arquivo, ...files],
    }));

    // Limpa URLs antigas ao sair da memória
    files.forEach((file) => URL.revokeObjectURL(file));
  }
  function handleRemovePhotoFile(index) {
    setArquivo((prev) => prev.filter((_, i) => i !== index));
    setForm((prevForm) => ({
      ...prevForm,
      Arquivo: prevForm.Arquivo.filter((_, i) => i !== index),
    }));

    // Se não houver mais arquivos, reseta o input
    if (arquivo.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Suspense>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      <div className={`${isLoading && "hidden"} w-full`}>
        <div className="p-3 m-3">
          <h3 className="text-2xl font-semibold">Cadastro de Produtos</h3>
        </div>

        {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
        <div className="grid gap-4">
          <div className="">
            <Input
              placeholder={"Nome do produto"}
              icon={"tag"}
              name={"Nome"}
              id={"Nome"}
              onChange={handleChange}
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
              onChange={(event, originalValue, maskedValue) =>
                setForm({ ...form, precoCusto: maskedValue })
              }
              value={form.precoCusto}
            />
          </div>
          <div className="">
            <InputMoney
              placeholder={"Preço de venda"}
              icon={"badge-dollar-sign"}
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
              icon={"badge-dollar-sign"}
              name={"Lucro"}
              id={"Lucro"}
              value={form.Lucro}
              disabled={true}
            />
          </div>
          <div className="">
            {/* <DataPicker
              onChange={(newValue) => {
                setData(newValue);
              }}
              value={data}
              placeholder="Selecione a data da compra"
            /> */}
          </div>
          <div className="">
            <input
              type="file"
              multiple
              placeholder="Arquivo"
              onChange={Image}
              accept="image/*"
              ref={fileInputRef}
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
          <div className="w-full flex mt-2 gap-4">
            {arquivo.map((imgSrc, index) => (
              <ImageArquivo
                key={index}
                arquivo={imgSrc}
                onClick={() => handleRemovePhotoFile(index)}
              />
            ))}
          </div>

          <Button color={"primary"} onClick={CriarProduto}>
            Criar
          </Button>
          <Button color={"secondary"} onClick={Voltar}>
            Voltar
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default Criar;
