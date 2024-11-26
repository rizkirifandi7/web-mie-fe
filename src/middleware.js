import { NextResponse } from "next/server";
import { getCookie } from "./actions/cookies";
import jwt from "jsonwebtoken";

export async function middleware(request) {
	// const cookies = getCookie("auth_session");
	// const token = jwt.decode(cookies);

	// if (!token && request.nextUrl.pathname.startsWith("/admin")) {
	// 	return NextResponse.rewrite(new URL("/auth/signin", request.url));
	// }

	// if (request.nextUrl.pathname.startsWith("/auth")) {
	// 	return NextResponse.rewrite(new URL("/auth/signin", request.url));
	// }

	return NextResponse.next();
}

// export const config = {
// 	matcher: ["/admin/:path*", "/auth/:path*"],
// };
