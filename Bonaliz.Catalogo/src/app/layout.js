import "./globals.css";

export const metadata = {
  title: "Catalogo - Bona Liz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="container">{children}</body>
    </html>
  );
}
