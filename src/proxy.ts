import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/lib/constants";

const PROTECTED_PREFIX = "/tarefas";
const REDIRECT_IF_AUTHENTICATED = ["/login", "/register", "/"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(PROTECTED_PREFIX) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (REDIRECT_IF_AUTHENTICATED.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/tarefas", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/tarefas/:path*", "/login", "/register"],
};
