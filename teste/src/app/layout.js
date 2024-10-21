import Header from "@/Components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="br">
      <body className="container">
        <div>
          <Header />
        </div>
        {children}
      </body>
    </html>
  );
}
