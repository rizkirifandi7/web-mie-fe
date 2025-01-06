import { NextResponse } from "next/server";

export async function middleware(request) {
	const token = request.cookies.get("auth_token");
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/dashboard") && !token) {
		return NextResponse.redirect(new URL("/auth/signin", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/auth/:path*"],
};
