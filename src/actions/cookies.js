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
	return cookies().get(name).value;
};

const removeCookie = (name) => {
	cookies().set(name, "");
};

export { setCookie, removeCookie, getCookie };
