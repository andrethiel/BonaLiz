import { UseCarrinho } from "@/hook/CarrinhoContext";
import React from "react";
import { PiPlus } from "react-icons/pi";
import { VscChromeMinimize } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";
import { useAuth } from "@/hook/AuthContext";

function Carrinho() {
  const {
    isOpen,
    setIsOpen,
    itensCarrinho,
    updateCarrinho,
    removerItem,
    total,
    handaleWhats,
  } = UseCarrinho();

  const { setModalLogin, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-10"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Carrinho de compras</h2>
          <button
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineClose size={16} />
          </button>
        </div>

        <div className="h-[calc(100vh-12rem)] py-4">
          {itensCarrinho.length == 0 ? (
            <p className="text-center text-gray-500">Carrinho Vazio</p>
          ) : (
            itensCarrinho.map((item) => (
              <div
                key={item.Id}
                className="flex justify-center gap-4 rounded-lg p-4"
              >
                <img
                  src={item.Imagem}
                  alt={item.Imagem}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.Produto}</h3>
                  <p className="text-sm text-gray-500">{item.Preco}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateCarrinho(item.ProdutoId, item.Quantidade - 1)
                    }
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <VscChromeMinimize size={16} />
                  </button>
                  <span className="w-8 text-center">{item.Quantidade}</span>
                  <button
                    onClick={() =>
                      updateCarrinho(item.ProdutoId, item.Quantidade + 1)
                    }
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <PiPlus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removerItem(item.ProdutoId)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <AiOutlineClose size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="mt-auto border-t pt-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">R$ {total.toFixed(2)}</span>
          </div>
          <Button
            color={"primary"}
            disabled={itensCarrinho.length === 0}
            onClick={() =>
              !isAuthenticated ? setModalLogin(true) : handaleWhats()
            }
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;
