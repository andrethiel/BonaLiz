"use client";
import { images } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import AsideItem from "../AsideItem";
import {
  FaBars,
  FaHome,
  FaRegWindowClose,
  FaShoppingBasket,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { BsTag } from "react-icons/bs";

// import { Container } from './styles';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <Image src={images.Logo} alt="" className="w-14 mr-3" />
        </a>
        <div className="flex lg:hidden md:hidden">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg border-2 bg-primery"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? <FaRegWindowClose /> : <FaBars />}
          </button>
        </div>
        <div className={`${!navbar ? "hidden" : ""} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border-2 lg:bg-white md:bg-white border-gray-600 bg-secondary rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <AsideItem icon={<FaHome />} href="/pages/Adm/Principal">
              Inicio
            </AsideItem>
            <AsideItem icon={<FaShoppingBasket />} href="/pages/Adm/Fornecedor">
              Forncedor
            </AsideItem>
            <AsideItem
              icon={<FaShoppingBasket />}
              href="/pages/Adm/TipoProduto"
            >
              Tipo Produto
            </AsideItem>
            <AsideItem icon={<BsTag />} href="/pages/Adm/Produto">
              Produtos
            </AsideItem>
            <AsideItem icon={<FaUser />} href="/pages/Adm/Clientes">
              Clientes
            </AsideItem>
            <AsideItem icon={<FaCartShopping />} href="/pages/Adm/Vendas">
              Vendas
            </AsideItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
