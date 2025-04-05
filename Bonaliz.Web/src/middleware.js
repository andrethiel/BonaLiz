import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const protectedRoutes = [
    "/pages/Adm",
    "/pages/Adm/Clientes",
    "/pages/Adm/Clientes/Criar",
  ];

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/perfil", "/configuracoes"],
};
