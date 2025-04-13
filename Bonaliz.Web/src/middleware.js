import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get(".AspNetCore.Identity.Application")?.value;
  const protectedRoutes = [
    "/pages/Adm",
    "/pages/Adm/Clientes",
    "/pages/Adm/Clientes/Criar",
    "/pages/Adm/Clientes/Editar",
    "/pages/Adm/Fornecedor",
    "/pages/Adm/Fornecedor/Criar",
    "/pages/Adm/Fornecedor/Editar",
    "/pages/Adm/Produto",
    "/pages/Adm/Produto/Criar",
    "/pages/Adm/Produto/Editar",
    "/pages/Adm/TipoProduto",
    "/pages/Adm/Produto/Criar",
    "/pages/Adm/Produto/Editar",
    "/pages/Adm/Vendas",
  ];

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pages/Adm",
    "/pages/Adm/Clientes",
    "/pages/Adm/Clientes/Criar",
    "/pages/Adm/Clientes/Editar",
    "/pages/Adm/Fornecedor",
    "/pages/Adm/Fornecedor/Criar",
    "/pages/Adm/Fornecedor/Editar",
    "/pages/Adm/Produto",
    "/pages/Adm/Produto/Criar",
    "/pages/Adm/Produto/Editar",
    "/pages/Adm/TipoProduto",
    "/pages/Adm/Produto/Criar",
    "/pages/Adm/Produto/Editar",
    "/pages/Adm/Vendas",
  ],
};
