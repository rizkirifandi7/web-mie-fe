"use server";

import { cookies } from "next/headers";

const setCookie = (name, value) => {
	cookies().set({
		name,
		value,
		httpOnly: true,
		path: "/",
	});
};

const getCookie = (name) => {
	const cookie = cookies().get(name);
	return cookie ? cookie.value : null;
};

const removeCookie = (name) => {
	cookies().set(name, "");
};

export { setCookie, removeCookie, getCookie };
