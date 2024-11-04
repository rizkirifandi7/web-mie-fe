import { NextResponse } from "next/server";
import { getCookie } from "./actions/cookies";
import jwt from "jsonwebtoken";

export async function middleware(request) {
	const cookies = getCookie("auth_session");

	const token = jwt.decode(cookies);

	if (!token || token.role !== "admin") {
		return NextResponse.redirect("http://localhost:3000/auth/signin");
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/admin/:path*",
};
