import Header from "@/Components/Header/menu";
import "../../globals.css";

export const metadata = {
  title: "Sistema - Bona Liz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="br">
      <body>
        <div>
          <Header />
        </div>
        <div className="ml-8 md:ml-24 lg:ml-24 xl:ml-24">{children}</div>
      </body>
    </html>
  );
}
