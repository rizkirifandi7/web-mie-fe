// filepath: /c:/IKI/project-client/dmiehan/dmiehan-fe/src/actions/cookies.js
import Cookies from "js-cookie";

const setCookie = (name, value) => {
	Cookies.set(name, value, { path: "/", secure: true, sameSite: "strict" });
};

const getCookie = (name) => {
	return Cookies.get(name);
};

const removeCookie = (name) => {
	Cookies.remove(name, { path: "/" });
};

export { setCookie, removeCookie, getCookie };
