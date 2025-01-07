"use client";
import Judul from "@/components/Judul";
import React from "react";
import PaketKemitraan from "./components/PaketKemitraan";
import axios from "axios";
import BackgroundBox from "@/components/BackgroundBox";

const PageTemukanKami = () => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan`
			);
			const data = await response.data.data;
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-lg mx-auto py-28 px-8 md:px-0">
				<BackgroundBox>
					<Judul mainText="D'EMIEHAN" subText="Kemitraan" />
				</BackgroundBox>

				<div className="mt-20">
					<h1 className="text-3xl font-bold text-center">Paket Kemitraan</h1>
					<p className="text-center text-sm md:text-base mt-4 px-2 md:px-0">
						Membantu pelaku usaha pemula dalam memulai dan mengembangkan bisnis
						kuliner dengan menyediakan paket usaha yang terjangkau dan mudah
						diakses.
					</p>
					{data.length === 0 && (
						<p className="text-center text-slate-500 mt-4">
							Tidak ada paket kemitraan
						</p>
					)}
					<PaketKemitraan data={data} />
				</div>
			</div>
		</section>
	);
};

export default PageTemukanKami;
