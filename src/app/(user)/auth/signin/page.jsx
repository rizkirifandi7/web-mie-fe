import React from "react";
import SignIn from "./components/SignIn";

export const metadata = {
	title: "Login | Dmiehan",
	description: "Dmiehan",
	icons: {
		icon: "logobrand.png",
	},
};

const SignInPage = () => {
	return (
		<div>
			<SignIn />
		</div>
	);
};

export default SignInPage;
