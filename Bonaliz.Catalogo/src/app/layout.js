import "./globals.css";
import { CarrinhoProvider } from "@/hook/CarrinhoContext";
import { AuthProvider } from "@/hook/AuthContext";

export const metadata = {
  title: "Catalogo - Bona Liz",
};
export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <CarrinhoProvider>
        <AuthProvider>
          <body className="container">{children}</body>
        </AuthProvider>
      </CarrinhoProvider>
    </html>
  );
}
