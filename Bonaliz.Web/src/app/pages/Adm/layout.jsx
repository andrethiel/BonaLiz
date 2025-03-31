import Header from "@/Components/Header/menu";
import "../../globals.css";
import { MenuProvider } from "@/Hooks/Menu";
import { FornecedorProvider } from "@/Hooks/Fornecedor";
import { TipoProdutoProvider } from "@/Hooks/TipoProduto";
import { ProdutoProvider } from "@/Hooks/Produto";
import { DragDropProvider } from "@/Hooks/DragDrop";
import { ClientesProvider } from "@/Hooks/Clientes";

export const metadata = {
  title: "Sistema - Bona Liz",
};

export default function PrincipalLayout({ children }) {
  return (
    <html lang="br">
      <MenuProvider>
        <FornecedorProvider>
          <TipoProdutoProvider>
            <ProdutoProvider>
              <DragDropProvider>
                <ClientesProvider>
                  <body className="container">
                    <div>
                      <Header />
                    </div>
                    <div className="pl-12 md:pl-64 lg:pl-64 xl:pl-64">
                      {children}
                    </div>
                  </body>
                </ClientesProvider>
              </DragDropProvider>
            </ProdutoProvider>
          </TipoProdutoProvider>
        </FornecedorProvider>
      </MenuProvider>
    </html>
  );
}
