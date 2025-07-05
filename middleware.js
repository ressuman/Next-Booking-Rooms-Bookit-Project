import { NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth";

const protectedPaths = [
  "/bookings",
  "/rooms/add",
  "/rooms/my",
  "/rooms/edit/:id",
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  //console.log(`Path: ${pathname}`);

  // Skip if not a protected path
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  //console.log(`Protected: ${isProtected} `);

  try {
    //  Auth check
    const { isAuthenticated } = await checkAuth();

    //console.log(` Authenticated: ${isAuthenticated}`);

    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Authentication error:", error);
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    // Match all request paths except static files
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
