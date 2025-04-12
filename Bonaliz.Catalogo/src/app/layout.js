import "./globals.css";
import { CarrinhoProvider } from "@/hook/CarrinhoContext";
import { AuthProvider } from "@/hook/AuthContext";
import { ProdutoProvider } from "@/hook/Produto";
import { GlobalStateProvider } from "@/hook/GlobalContext";

export const metadata = {
  title: "Catalogo - Bona Liz",
};
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="container">
        <GlobalStateProvider>
          <CarrinhoProvider>
            <AuthProvider>
              <ProdutoProvider>{children}</ProdutoProvider>
            </AuthProvider>
          </CarrinhoProvider>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
