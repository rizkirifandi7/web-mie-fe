import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Home Page | Dmiehan",
	description: "Dmiehan",
	icons: {
		icon: "logobrand.png",
	},
};

const HomeLayout = ({ children }) => {
	return (
		<div className={inter.className}>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default HomeLayout;
