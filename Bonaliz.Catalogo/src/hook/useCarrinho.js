"use client";
import { useContext, useState } from "react";
import { CarrinhoContext } from "./CarrinhoContext";

export function useClienteCarrinho() {
  const { itensCarrinho, setItensCarrinho, EnviarCarrinhoLogin } =
    useContext(CarrinhoContext);

  async function sincronizarComUsuario(carrinhoId) {
    console.log(itensCarrinho);
    // if (itensCarrinho.length > 0) {
    //   itensCarrinho.map((item) => (item.CarrinhoId = carrinhoId));
    //   await EnviarCarrinhoLogin();
    // }
  }

  async function clienteCatalogo(user) {
    const response = await CadastrarClienteCatalogo(user);
    return response;
  }

  return { sincronizarComUsuario, clienteCatalogo };
}
