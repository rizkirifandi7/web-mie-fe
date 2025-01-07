import React from "react";
import Hero from "../../components/homepage/Hero";
import Tentang from "../../components/homepage/Tentang";
import Menu from "../../components/homepage/Menu";
import Kemitraan from "../../components/homepage/Kemitraan";
import Kontak from "../../components/homepage/Kontak";
import Feedback from "@/components/homepage/Feedback";
import Banner from "@/components/homepage/Banner";

const PageHome = () => {
	return (
		<>
			<Hero />
			<Tentang />
			<Banner />
			<Menu />
			<Kemitraan />
			<Kontak />
			<Feedback />
		</>
	);
};

export default PageHome;
