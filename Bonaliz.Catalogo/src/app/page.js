"use client";
import Logo from "@/app/fonts/logo.png";
import Image from "next/image";
import { FiFilter } from "react-icons/fi";
import { ProdutoContext } from "../hook/Produto";
import { useContext } from "react";
import Button from "../components/Button";
import CustomLoading from "@/components/CustomLoadingGrid";
import Select from "@/components/Select";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Autoplay, Navigation } from "swiper/modules";
import { PiShoppingCart, PiSignOut, PiUser } from "react-icons/pi";
import Carrinho from "@/components/Carrinho";
import { CarrinhoContext } from "@/hook/CarrinhoContext";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { AuthContext } from "@/hook/AuthContext";
import { IoPhonePortraitOutline } from "react-icons/io5";
import MaskInput from "@/components/InputMask";
import { useClienteCarrinho } from "@/hook/useCarrinho";
import { useGlobalState } from "@/hook/GlobalContext";
import Filter from "@/components/Filter";

export default function Home() {
  const { EnviarCarrinho, itensCarrinho, setIsOpen, isLoading } =
    useContext(CarrinhoContext);

  const {
    isAuthenticated,
    logout,
    modalLogin,
    setModalLogin,
    Login,
    handlerOnBlur,
  } = useContext(AuthContext);

  const { produtos, selectTipoProduto, FiltrarProdutos } =
    useContext(ProdutoContext);

  const { user, setUser } = useGlobalState();

  if (isLoading) {
    return <CustomLoading loadingMessage="Aguarde..." />;
  }

  return (
    <div>
      <nav className="border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <Image src={Logo} alt="" className="w-16 mr-3" />
          </a>
          <div className="flex gap-2">
            <div className="flex justify-center items-center p-1 border-0 bg-transparent gap-3">
              {isAuthenticated ? (
                <div
                  className="flex flex-row gap-1 cursor-pointer"
                  onClick={logout}
                >
                  <span>Sair</span>
                  <PiSignOut size={24} />
                </div>
              ) : (
                <div
                  className="flex flex-row gap-1 cursor-pointer"
                  onClick={() => setModalLogin(true)}
                >
                  <span>Entrar</span>
                  <PiUser size={24} />
                </div>
              )}
            </div>
            <button
              className="flex justify-center items-center p-1 border-0 bg-transparent relative"
              onClick={() => !setIsOpen(true)}
            >
              <PiShoppingCart size={24} />
              <span className="bg-secondary w-4 h-4 absolute top-0 left-0 text-xs font-semibold flex justify-center items-center rounded-xl">
                {itensCarrinho.length}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex items-center flex-col my-6 gap-4"></div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:block w-full md:w-1/4 lg:w-1/5">
          {selectTipoProduto && (
            <Filter
              data={selectTipoProduto}
              onChange={(e) => FiltrarProdutos(parseInt(e.target.value))}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-6">
          {produtos.map((item, index) => (
            <div
              key={index}
              className="rounded overflow-hidden shadow-md flex items-center cursor-pointer"
            >
              {item.urlImagem && item.urlImagem.length == 0 ? (
                ""
              ) : item.urlImagem.length > 1 ? (
                item.urlImagem.map((imagem, index) => (
                  <img className="w-32 object-cover" src={imagem} key={index} />
                ))
              ) : (
                <img
                  className="w-32 object-cover"
                  src={item.urlImagem[0].nomeArquivo}
                />
              )}

              <div className="flex flex-col px-6 py-4 gap-4">
                <div className="text-xl">{item.nome}</div>
                <div className="font-bold text-xl">
                  Valor: {item.precoVenda}
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={async () => {
                      if (localStorage.getItem("CarrinhoId") == null) {
                        setUser((prev) => ({
                          ...prev,
                          nome: localStorage.getItem("nome"),
                          telefone: localStorage.getItem("telefone"),
                        }));
                        if (await Login()) {
                          EnviarCarrinho(item);
                          return;
                        }
                      }
                      EnviarCarrinho(item);
                    }}
                  >
                    Adicionar ao carrinho
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Carrinho />
        </div>
      </div>

      {modalLogin && (
        <Modal>
          <div>
            <h5 className="text-center text-lg font-medium mb-4">
              Nos diga quem é você
            </h5>
          </div>
          <div className="space-y-4 w-full max-w-sm mx-auto">
            <div>
              <MaskInput
                placeholder={"N° de telefone"}
                icon={<IoPhonePortraitOutline />}
                mask={"(00) 00000-0000"}
                onChange={(e) => setUser({ ...user, telefone: e.target.value })}
                value={user.telefone}
                onBlur={handlerOnBlur}
              />
            </div>
            <div>
              <Input
                placeholder={"Nome completo"}
                icon={<PiUser />}
                onChange={(e) => setUser({ ...user, nome: e.target.value })}
                value={user.nome}
              />
            </div>
            <Button color={"primary"} onClick={Login}>
              Enviar
            </Button>
            <Button color={"secondary"} onClick={() => setModalLogin(false)}>
              Cancelar
            </Button>
            {/* <div className="border-t-2 mt-4 py-4">
              <Link className="text-center font-bold text-sm cursor-pointer">
                Criar sua conta.
              </Link>
            </div> */}
          </div>
        </Modal>
      )}
    </div>
  );
}
