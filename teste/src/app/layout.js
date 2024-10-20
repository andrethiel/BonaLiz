import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="br">
      <body>{children}</body>
    </html>
  );
}
