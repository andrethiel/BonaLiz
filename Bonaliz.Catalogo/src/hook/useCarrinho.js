"use client";
import { useContext, useState } from "react";
import { CarrinhoContext } from "./CarrinhoContext";

export function useClienteCarrinho() {
  const { itensCarrinho, setItensCarrinho, EnviarCarrinhoLogin } =
    useContext(CarrinhoContext);

  async function sincronizarComUsuario(carrinhoId) {
    if (itensCarrinho.length > 0) {
      const novosItens = itensCarrinho.map((item) => ({
        ...item,
        CarrinhoId: carrinhoId,
      }));
      setItensCarrinho(novosItens);
      await EnviarCarrinhoLogin(novosItens);
    }
  }

  async function clienteCatalogo(user) {
    const response = await CadastrarClienteCatalogo(user);
    return response;
  }

  return { sincronizarComUsuario, clienteCatalogo };
}
