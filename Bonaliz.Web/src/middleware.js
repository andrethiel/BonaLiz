// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const hostname = req.headers.get("host") || "";
//   const subdomain = hostname.split(".")[0];

//   const token = req.cookies.get(".AspNetCore.Identity.Application")?.value;
//   const protectedRoutes = [
//     "/pages/Adm",
//     "/pages/Adm/Clientes",
//     "/pages/Adm/Clientes/Criar",
//     "/pages/Adm/Clientes/Editar",
//     "/pages/Adm/Fornecedor",
//     "/pages/Adm/Fornecedor/Criar",
//     "/pages/Adm/Fornecedor/Editar",
//     "/pages/Adm/Produto",
//     "/pages/Adm/Produto/Criar",
//     "/pages/Adm/Produto/Editar",
//     "/pages/Adm/TipoProduto",
//     "/pages/Adm/Produto/Criar",
//     "/pages/Adm/Produto/Editar",
//     "/pages/Adm/Vendas",
//     "/pages/Adm/Carrinho",
//   ];

//   if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   const response = NextResponse.next();
//   response.cookies.set("TenantId", subdomain);
//   return response;
// }

// export const config = {
//   matcher: [
//     "/pages/Adm",
//     "/pages/Adm/Clientes",
//     "/pages/Adm/Clientes/Criar",
//     "/pages/Adm/Clientes/Editar",
//     "/pages/Adm/Fornecedor",
//     "/pages/Adm/Fornecedor/Criar",
//     "/pages/Adm/Fornecedor/Editar",
//     "/pages/Adm/Produto",
//     "/pages/Adm/Produto/Criar",
//     "/pages/Adm/Produto/Editar",
//     "/pages/Adm/TipoProduto",
//     "/pages/Adm/Produto/Criar",
//     "/pages/Adm/Produto/Editar",
//     "/pages/Adm/Vendas",
//     "/pages/Adm/Carrinho",
//   ],
// };
