import { images } from "@/constants";
import Image from "next/image";
import { FaHome, FaShoppingBasket } from "react-icons/fa";
import AsideItem from "../AsideItem";

export default function Header() {
  return (
    <div className="bg-gray-200 font-sans">
      <div className="flex">
        <div className="w-64 h-screen">
          <div className="flex items-center justify-center mt-10">
            <Image src={images.Logo} alt="" />
          </div>
          <nav className="mt-10">
            <div>
              <AsideItem
                icon={<FaHome />}
                children="Inicio"
                href="/Principal"
              />
              <AsideItem
                icon={<FaShoppingBasket />}
                children="Forncedor"
                href="/tabs/Fornecedor"
              />
              <AsideItem
                icon={<FaShoppingBasket />}
                children="Tipo Produto"
                href="/tabs/TipoProduto"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
