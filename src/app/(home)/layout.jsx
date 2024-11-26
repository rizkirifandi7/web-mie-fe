import React from "react";
import Navbar from "./beranda/components/Navbar";
import Footer from "./beranda/components/Footer";

export const metadata = {
	title: "Home Page | Dmiehan",
	description: "Dmiehan",
	icons: {
		icon: "logobrand.png",
	},
};

const HomeLayout = ({ children }) => {
	return (
		<div className="font-advent">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default HomeLayout;
