import { NextResponse } from "next/server";
import { getCookie } from "./actions/cookies";
import jwt from "jsonwebtoken";

export async function middleware(request) {
	const token = getCookie("auth_token");

	if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
		return NextResponse.rewrite(new URL("/auth/signin", request.url));
	}

	if (request.nextUrl.pathname.startsWith("/auth")) {
		return NextResponse.rewrite(new URL("/auth/signin", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/auth/:path*"],
};
