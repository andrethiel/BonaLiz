import { AuthProvider } from "@/Hooks/Login";
import "./globals.css";
import { GlobalProvider } from "@/Hooks/GlobalState";

export const metadata = {
  title: "Sistema - Bona Liz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="br">
      <body>
        <GlobalProvider>
          <AuthProvider>{children}</AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
