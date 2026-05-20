import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Private routes that require authentication
  const privateRoutes = ["/my-bookings", "/add-car", "/my-added-cars"];
  
  // Car details page pattern: /explore-cars/[id]
  const carDetailsPattern = /^\/explore-cars\/[^/]+$/;

  // Check if the current path is a private route or car details page
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isCarDetailsPage = carDetailsPattern.test(pathname);

  if (isPrivateRoute || isCarDetailsPage) {
    // Check for session cookie
    const sessionCookie = request.cookies.get("better-auth.session_token");
    
    // If no session cookie, redirect to login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings", "/add-car", "/my-added-cars", "/explore-cars/:id"],
};
