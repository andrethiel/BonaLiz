"use client";
import { images } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import AsideItem from "../AsideItem";
import { ChevronDown, CircleX, House, Menu } from "lucide-react";
import { MenuItens } from "@/constants/menu";
import Link from "next/link";

const Header_ = () => {
  const [navbar, setNavbar] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (label) => {
    if (activeMenu === label) {
      setActiveMenu(null);
    } else {
      setActiveMenu(label);
    }
  };

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
            {navbar ? <CircleX /> : <Menu />}
          </button>
        </div>
        <div className={`${!navbar ? "hidden" : ""} w-full md:block md:w-auto`}>
          <ul className="flex items-center space-x-1 ml-6">
            {MenuItens.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent ${
                      activeMenu === item.label
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform duration-200 ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent text-muted-foreground"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                )}
                {item.subItems && activeMenu === item.label && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-border/60 z-50 py-1 animate-in fade-in-50 zoom-in-95">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors"
                      >
                        {subItem.icon}
                        <span className="ml-2">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* <AsideItem icon={<House />} href="/pages/Adm/Principal">
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
            </AsideItem> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header_;
