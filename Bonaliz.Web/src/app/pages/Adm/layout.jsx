import Header from "@/Components/Header/menu";
import "../../globals.css";
import { MenuProvider } from "@/Hooks/Menu";
import { FornecedorProvider } from "@/Hooks/Fornecedor";
import { TipoProdutoProvider } from "@/Hooks/TipoProduto";

export const metadata = {
  title: "Sistema - Bona Liz",
};

export default function PrincipalLayout({ children }) {
  return (
    <html lang="br">
      <MenuProvider>
        <FornecedorProvider>
          <TipoProdutoProvider>
            <body className="container">
              <div>
                <Header />
              </div>
              <div className="pl-12 md:pl-64 lg:pl-64 xl:pl-64">{children}</div>
            </body>
          </TipoProdutoProvider>
        </FornecedorProvider>
      </MenuProvider>
    </html>
  );
}
