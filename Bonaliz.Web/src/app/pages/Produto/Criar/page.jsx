"use client";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { useRouter } from "next/navigation";
import React from "react";
import { BsTag } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";

// import { Container } from './styles';

const Criar = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="p-3 m-3">
        <h3 className="text-2xl font-semibold">Cadastro de Produtos</h3>
      </div>
      {/* {alert && <Alert children={alert.message} type={alert.type} />} */}
      <div className="gap-2">
        <div className="">
          <Input
            placeholder={"Nome do produto"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
          />
        </div>
        <div>
          <Select
            data={[]}
            placeholder={"Selecione um Fornecedor"}
            icon={<FaGlobeAmericas />}
            name={"Estado"}
            id={"Estado"}
          />
        </div>
        <div>
          <Select
            data={[]}
            placeholder={"Selecione um tipo de produto"}
            icon={<FaGlobeAmericas />}
            name={"Estado"}
            id={"Estado"}
          />
        </div>
        <div className="">
          <Input
            placeholder={"Preço de custo"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
          />
        </div>
        <div className="">
          <Input
            placeholder={"Preço de venda"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
          />
        </div>
        <div className="">
          <Input
            placeholder={"Lucro"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
          />
        </div>
        <div className="">
          <Input
            placeholder={"Preço de custo"}
            icon={<BsTag />}
            name={"Nome"}
            id={"Nome"}
          />
        </div>

        <Button children={"Criar"} color={"primary"} />
        <Button
          children={"Voltar"}
          color={"secondary"}
          onClick={() => router.back()}
        />
      </div>
    </div>
  );
};

export default Criar;
