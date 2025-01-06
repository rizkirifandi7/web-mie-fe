import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/homepage/Footer";
import { Inter } from "next/font/google";
import ButtonWa from "@/components/ButtonWa";
import { Toaster } from "sonner";

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
		<div className={`${inter.className} relative`}>
			<Toaster />
			<Navbar />
			{children}
			<Footer />
			<div className="fixed bottom-4 right-4">
				<ButtonWa />
			</div>
		</div>
	);
};

export default HomeLayout;
