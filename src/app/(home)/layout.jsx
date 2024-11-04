import React from "react";
import Navbar from "./beranda/components/Navbar";
import Footer from "./beranda/components/Footer";

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
