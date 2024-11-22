import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="container">{children}</body>
    </html>
  );
}
