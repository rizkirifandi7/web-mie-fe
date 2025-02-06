import { NextResponse } from "next/server";

export async function middleware(request) {
	const token = request.cookies.get("auth_token");
	const session = request.cookies.get("auth_session");
	const { pathname } = request.nextUrl;

	if (
		!session &&
		(pathname.startsWith("/dashboard-mitra") ||
			pathname.startsWith("/dashboard-superadmin"))
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (!token && pathname.startsWith("/dashboard-home")) {
		return NextResponse.redirect(new URL("/auth/signin", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard-home/:path*",
		"/dashboard-mitra/:path*",
		"/dashboard-superadmin/:path*",
	],
};
