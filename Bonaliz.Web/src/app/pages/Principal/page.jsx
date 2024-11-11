"use client";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import Select2 from "@/Components/Select2";
import { SelectListClientes } from "@/Hooks/ClienteSelect";
import { SelectListFornecedor } from "@/Hooks/FornecedorSelect";
import { PrincipalHook } from "@/Hooks/Principal";
import { ProdutosHook } from "@/Hooks/Produto";
import { listTipoProduto } from "@/Hooks/TipoProdutoSelect";
import { VendasHook } from "@/Hooks/Venda";
import React, { useEffect } from "react";
import { BsTag } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

function Principal() {
  const {
    Produtos,
    isLoading,
    setForm,
    form,
    listar,
    setProdutos,
    setIsLoading,
    isOpen,
    setIsOpen,
  } = PrincipalHook();
  const { Cadastrar, alert, setAlert } = VendasHook(form);
  const { selectFornecedor } = SelectListFornecedor();
  const { selectTipoProduto } = listTipoProduto();
  const { PesquisarProduto } = ProdutosHook();

  function handleOpenModal(prod) {
    setForm({ ...form, ProdutoId: prod });
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
  }
  const { selectClientes } = SelectListClientes(isOpen);

  async function Vender() {
    await Cadastrar(form);
    await listar();
    setIsOpen(false);
  }

  async function Pesquisar() {
    setIsLoading(true);
    const response = await PesquisarProduto(form);
    if (response.length) {
      setProdutos(response);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setAlert({
        ...alert,
        message: "",
        type: "",
      });
    }, [500]);
  }, [alert]);

  return (
    <div>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className={`flex flex-col my-6 ${isLoading && "hidden"}`}>
        {isOpen && (
          <Modal
            open={isOpen}
            close={handleCloseModal}
            title={"Realizar venda"}
          >
            <Select2
              placeholder={"Digite o nome do cliente"}
              data={selectClientes}
              onChange={(e) =>
                setForm({ ...form, ClienteId: e.value.toString() })
              }
            />
            <Input
              icon={<FaCartPlus />}
              placeholder={"Quantidade"}
              type={"number"}
              onChange={(e) =>
                setForm({
                  ...form,
                  Quantidade: e.target.value,
                })
              }
            />
            <Button color={"primary"} onClick={Vender}>
              Vender
            </Button>
            <Button color={"secondary"} onClick={handleCloseModal}>
              Voltar
            </Button>
          </Modal>
        )}
        <div className="grid  grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 pb-4">
          <Input
            placeholder={"Nome do produto"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
            onChange={(e) => setForm({ ...form, Nome: e.target.value })}
            value={form.Nome}
          />
          {selectFornecedor && (
            <Select2
              data={selectFornecedor}
              placeholder={"Selecione um fornecedor"}
              onChange={(e) =>
                setForm({ ...form, FornecedorId: e.value.toString() })
              }
            />
          )}
          {selectTipoProduto && (
            <Select2
              data={selectTipoProduto}
              placeholder={"Selecione um Tipo de produto"}
              onChange={(e) =>
                setForm({ ...form, ProdutoId: e.value.toString() })
              }
            />
          )}

          <Button color={"primary"} onClick={Pesquisar}>
            Pesquisar
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {Produtos.map((item) => (
            <Card
              texto={item.nome}
              imagem={item.urlImagem}
              onClick={() => handleOpenModal(item.id.toString())}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Principal;
