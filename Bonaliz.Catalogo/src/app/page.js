"use client";
import Logo from "@/app/fonts/logo.png";
import Image from "next/image";
import { FiFilter } from "react-icons/fi";
import { Principal } from "../hook/Produto";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import CustomLoading from "@/components/CustomLoadingGrid";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

export default function Home() {
  const { produtos, Listar, SelectList, selectTipoProduto, FiltrarProdutos } =
    Principal();
  const [tipoProduto, setTipoProduto] = useState("");
  const [Produto, setProduto] = useState({
    Produto: "",
    Codigo: "",
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    SelectList();
    Listar();
  }, []);

  function handeleModal(nome, codigo) {
    setOpen(true);
    setProduto({ ...Produto, Produto: nome, Codigo: codigo });
  }

  function handaleWhats() {
    window.open(
      `https://api.whatsapp.com/send/?phone=5541987704278&text=Olá estou interessada no produto ${Produto.Produto}(${Produto.Codigo})&type=phone_number&app_absent=0`
    );
  }

  if (produtos.length === 0) {
    return <CustomLoading loadingMessage="Aguarde..." />;
  }

  return (
    <div>
      {isOpen && (
        <Modal>
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-semibold">
              {"Você está interessado nesse produto ?"}
            </h3>
            <Button color={"primary"} onClick={() => handaleWhats()}>
              Sim
            </Button>
            <Button onClick={() => setOpen(false)}>Não</Button>
          </div>
        </Modal>
      )}

      <div className="flex items-center flex-col my-6 gap-4">
        <Image src={Logo} alt="" className="w-16 mr-3" />

        {selectTipoProduto && (
          <div className="w-full flex flex-col gap-4">
            <Select
              data={selectTipoProduto}
              icon={<FiFilter />}
              placeholder={"Selecione um tipo de produto"}
              onChange={(e) => setTipoProduto(e.target.value)}
            />
            <Button
              color={"primary"}
              onClick={() => FiltrarProdutos(tipoProduto)}
            >
              Filtrar
            </Button>
          </div>
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

            <div className="px-6 py-4">
              <div
                className="text-xl"
                onClick={() => handeleModal(item.nome, item.codigo)}
              >
                {item.nome}
              </div>
              <div className="font-bold text-xl">Valor: {item.precoVenda}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
