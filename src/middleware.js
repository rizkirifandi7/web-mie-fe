import { NextResponse } from "next/server";

export async function middleware(request) {
	const token = request.cookies.get("auth_token");

	if (
		!token &&
		(pathname.startsWith("/dashboard") || pathname.startsWith("/auth"))
	) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/auth/:path*"],
};
