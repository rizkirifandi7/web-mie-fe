"use client";
import React from "react";
import Hero from "../../components/homepage/Hero";
import Tentang from "../../components/homepage/Tentang";
import Menu from "../../components/homepage/Menu";
import Kemitraan from "../../components/homepage/Kemitraan";
import Kontak from "../../components/homepage/Kontak";
import Feedback from "@/components/homepage/Feedback";
import Banner from "@/components/homepage/Banner";

const PageHome = () => {
	const [data, setData] = React.useState({});

	const fetchData = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/beranda/1`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const result = await response.json();
			setData(result.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Hero />
			<Tentang />
			<Banner />
			<Menu />
			<Kemitraan />
			<Kontak dataBeranda={data}/>
			<Feedback />
		</>
	);
};

export default PageHome;
