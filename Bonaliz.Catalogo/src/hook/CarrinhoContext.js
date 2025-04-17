"use client";
import {
  CarrinhoInserir,
  Checkout,
  Remover,
  UpdateQuantidade,
} from "@/Api/Controllers/Carrinho";
import { createContext, useContext, useEffect, useState } from "react";
import { useClienteCarrinho } from "./useCarrinho";
import { useGlobalState } from "./GlobalContext";
import { CadastrarClienteCatalogo } from "@/Api/Controllers/User";

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itensCarrinho, setItensCarrinho] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("carrinho");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, setIsLoading } = useGlobalState();

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
      try {
        const carrinhoId = localStorage.getItem("CarrinhoId");
        if (carrinhoId != null) {
          const response = await CarrinhoInserir([
            {
              CarrinhoId: carrinhoId,
              ProdutoId: itemCarrinho.id,
              Produto: itemCarrinho.nome,
              Quantidade: 1,
            },
          ]);
          AdicionaCarrinho(itemCarrinho);
        } else {
          const response = await CadastrarClienteCatalogo({
            Telefone: localStorage.getItem("telefone"),
          });
          if (response.success) {
            localStorage.setItem("CarrinhoId", response.data.carrinhoId);
            EnviarCarrinho(itemCarrinho);
          }
        }
      } catch (e) {
        alert(e.message);
        return;
      } finally {
        setIsLoading(false);
      }
    } else {
      AdicionaCarrinho(itemCarrinho);
    }
  }

  async function EnviarCarrinhoLogin() {
    if (itensCarrinho.length > 0) {
      try {
        setIsLoading(true);
        const response = await CarrinhoInserir(itensCarrinho);
        if (response.success) {
          // handaleWhats();
        }
      } catch (e) {
        console.log(e);
        alert(e.message);
        return;
      } finally {
        setIsLoading(false);
      }
    }
  }
  async function handaleWhats() {
    if (isAuthenticated()) {
      try {
        setIsLoading(true);
        let mensagem = "";

        const response = await Checkout(localStorage.getItem("CarrinhoId"));

        if (response.success) {
          itensCarrinho.map(
            (item, index) =>
              (mensagem += `%0A${index + 1} - Produto:%0A ${
                item.Produto
              }%0APreço: ${item.Preco}%0AQuantidade: ${item.Quantidade}%0A`)
          );
          mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
          window.open(
            `https://api.whatsapp.com/send/?phone=5541987704278&text=Olá estou interessado nos produtos ${mensagem}&type=phone_number&app_absent=0`,
            "_self"
          );

          localStorage.removeItem("carrinho");
          localStorage.removeItem("CarrinhoId");
          setItensCarrinho([]);
        }
      } catch (e) {
        console.log(e);
        alert("Erro ao criar carrinho");
        return;
      } finally {
        setIsLoading(false);
      }
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
        setItensCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
