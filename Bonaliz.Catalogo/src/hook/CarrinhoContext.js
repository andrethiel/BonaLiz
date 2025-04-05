"use client";
import {
  CarrinhoInserir,
  Remover,
  UpdateQuantidade,
} from "@/Api/Controllers/Carrinho";
import { createContext, useContext, useEffect, useState } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itensCarrinho, setItensCarrinho] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("carrinho");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  async function AdicionaCarrinho(itemCarrinho) {
    setItensCarrinho((produto) => {
      const existProduto = produto.find(
        (item) => item.ProdutoId == itemCarrinho.id
      );
      if (existProduto) {
        return produto.map((item) =>
          item.ProdutoId == itemCarrinho.id
            ? { ...item, Quantidade: item.Quantidade + 1 }
            : item
        );
      }
      return [
        ...produto,
        {
          CarrinhoId: itemCarrinho.CarrinhoId,
          ProdutoId: itemCarrinho.id,
          Produto: itemCarrinho.nome,
          Preco: itemCarrinho.precoVenda,
          Quantidade: 1,
          Imagem: itemCarrinho.urlImagem[0].nomeArquivo,
        },
      ];
    });
    setIsOpen(true);
  }

  async function updateCarrinho(id, quantidade) {
    if (isAuthenticated()) {
      const response = await UpdateQuantidade({
        CarrinhoId: localStorage.getItem("CarrinhoId"),
        ProdutoId: id,
        Quantidade: quantidade,
      });

      if (!response.success) {
        alert("Erro ao criar carrinho");
        return;
      }
    }

    if (quantidade < 1) {
      removerItem(id);
      return;
    }
    setItensCarrinho((currentItens) =>
      currentItens.map((item) =>
        item.ProdutoId == id ? { ...item, Quantidade: quantidade } : item
      )
    );
  }

  async function removerItem(id) {
    if (isAuthenticated()) {
      const response = await Remover({
        CarrinhoId: localStorage.getItem("CarrinhoId"),
        ProdutoId: id,
      });

      if (!response.success) {
        alert("Erro ao criar carrinho");
        return;
      }
    }
    setItensCarrinho((item) => item.filter((itens) => itens.ProdutoId != id));
  }

  const total = itensCarrinho.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.Preco.replace("R$ ", "").replace(",", ".")) *
        item.Quantidade,
    0
  );
  useEffect(() => {
    typeof window !== "undefined"
      ? window.localStorage.setItem("carrinho", JSON.stringify(itensCarrinho))
      : [];
  }, [itensCarrinho]);

  async function EnviarCarrinho(itemCarrinho) {
    if (isAuthenticated()) {
      const carrinhoId = localStorage.getItem("CarrinhoId");
      const response = await CarrinhoInserir([
        {
          CarrinhoId: carrinhoId,
          ProdutoId: itemCarrinho.id,
          Produto: itemCarrinho.nome,
          Quantidade: 1,
        },
      ]);
      AdicionaCarrinho(itemCarrinho);
      if (!response.success) {
        alert("Erro ao criar carrinho");
        return;
      }
    } else {
      AdicionaCarrinho(itemCarrinho);
    }
  }

  async function EnviarCarrinhoLogin() {
    if (itensCarrinho.length > 0) {
      const response = await CarrinhoInserir(itensCarrinho);
      if (!response.success) {
        alert("Erro ao criar carrinho");
        return;
      }
    }
  }
  function handaleWhats() {
    if (isAuthenticated()) {
      let mensagem = "";

      itensCarrinho.map(
        (item, index) =>
          (mensagem += `%0A${index + 1} - Produto:%0A ${
            item.Produto
          }%0APreço: ${item.Preco}%0AQuantidade: ${item.Quantidade}%0A`)
      );
      mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
      window.open(
        `https://api.whatsapp.com/send/?phone=5541987704278&text=Olá estou interessado nos produtos ${mensagem}&type=phone_number&app_absent=0`
      );
    }
  }

  function isAuthenticated() {
    return localStorage.getItem("isAuthenticated") == "true" ? true : false;
  }

  return (
    <CarrinhoContext.Provider
      value={{
        isOpen,
        setIsOpen,
        AdicionaCarrinho,
        total,
        itensCarrinho,
        updateCarrinho,
        removerItem,
        handaleWhats,
        EnviarCarrinho,
        EnviarCarrinhoLogin,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function UseCarrinho() {
  const context = useContext(CarrinhoContext);
  if (context == undefined) {
    throw new Error("erro");
  }

  return context;
}
