"use client";
import Card from "@/Components/Card";
import CustomLoading from "@/Components/CustomLoadingGrid";
import Modal from "@/Components/Modal";
import { SelectListClientes } from "@/Hooks/ClienteSelect";
import { PrincipalHook } from "@/Hooks/Principal";
import React, { useState } from "react";

const data = [
  {
    value: 1,
    label: "teste",
  },
  {
    value: 1,
    label: "nome",
  },
  {
    value: 1,
    label: "ssss",
  },
  {
    value: 1,
    label: "dddd",
  },
];
function Principal() {
  const { Produtos, isLoading, setForm, form } = PrincipalHook();
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal(prod) {
    setForm({ ...form, ProdutoId: prod });
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
  }

  function Vender() {
    console.log(form);
  }

  return (
    <div>
      {isLoading && <CustomLoading loadingMessage="Aguarde..." />}

      <div className={`flex flex-col my-6 ${isLoading && "hidden"}`}>
        {isOpen && (
          <Modal
            open={isOpen}
            close={handleCloseModal}
            form={form}
            setForm={setForm}
            onClick={Vender}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {Produtos.map((item) => (
            <Card
              texto={item.nome}
              imagem={item.urlImagem}
              onClick={() => handleOpenModal(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Principal;
