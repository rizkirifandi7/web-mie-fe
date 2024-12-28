import React from "react";
import Hero from "../../components/homepage/Hero";
import Tentang from "../../components/homepage/Tentang";
import Menu from "../../components/homepage/Menu";
import Kemitraan from "../../components/homepage/Kemitraan";
import Kontak from "../../components/homepage/Kontak";
import Feedback from "@/components/homepage/Feedback";

const PageHome = () => {
	return (
		<>
			<Hero />
			<Tentang />
			<Menu />
			<Kemitraan />
			<Kontak />
			<Feedback />
		</>
	);
};

export default PageHome;
