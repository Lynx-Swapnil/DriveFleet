import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Private routes that require authentication
  const privateRoutes = ["/my-bookings", "/add-car", "/my-added-cars"];

  // Check if the current path is a private route
  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    // Check for session cookie (better-auth uses cookies for sessions)
    const sessionCookie = request.cookies.get("better-auth.session_token");
    
    // If no session cookie, redirect to login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings", "/add-car", "/my-added-cars"],
};
