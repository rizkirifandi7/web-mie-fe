"use client";
import Judul from "@/components/Judul";
import React from "react";
import PaketKemitraan from "./components/PaketKemitraan";
import axios from "axios";

const PageTemukanKami = () => {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan`
			);
			const data = await response.data;
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-28 px-8 md:px-0">
				<div className="flex flex-col justify-center items-center w-full h-[200px] rounded-lg bg-center bg-no-repeat bg-cover bg-[url('/bg.jpg')] bg-gray-700 bg-blend-multiply text-white">
					<Judul mainText="D'EMIEHAN" subText="Kemitraan" />
					<p className="text-center text-sm md:text-base mt-4 px-2 md:px-0">
						Membantu pelaku usaha pemula dalam memulai dan mengembangkan bisnis
						kuliner dengan menyediakan paket usaha yang terjangkau dan mudah
						diakses.
					</p>
				</div>

				<div className="mt-20">
					<h1 className="text-3xl font-bold text-center">Paket Kemitraan</h1>
					<PaketKemitraan data={data} />
				</div>
			</div>
		</section>
	);
};

export default PageTemukanKami;
