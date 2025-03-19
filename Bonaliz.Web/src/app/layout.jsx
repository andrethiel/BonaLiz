import { AuthProvider } from "@/Hooks/Login";
import "./globals.css";
import { FornecedorProvider } from "@/Hooks/Fornecedor";
import { MenuContext } from "@/Hooks/Menu";

export const metadata = {
  title: "Sistema - Bona Liz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="br">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
