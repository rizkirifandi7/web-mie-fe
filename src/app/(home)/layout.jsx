import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/homepage/Footer";
import { Inter } from "next/font/google";
import ButtonWa from "@/components/ButtonWa";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Home Page | Demiehan",
	description: "Demiehan",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
			{ url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
		],
		apple: [{ url: "/logobrand.png", sizes: "180x180" }],
	},
	manifest: "/manifest.json",
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
