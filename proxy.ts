import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 🚫 Prevent logged-in users from visiting /login or /register
    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Allow NextAuth API routes
        if (pathname.startsWith("/api/auth")) return true;

        // Public pages (only for NON logged-in users)
        if (!token && (pathname === "/login" || pathname === "/register"))
          return true;

        // Public homepage and video API (GET requests)
        if (pathname === "/" || pathname.startsWith("/api/video")) return true;

        // Otherwise require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
