"use client";
import Judul from "@/components/Judul";
import React from "react";
import PaketKemitraan from "./components/PaketKemitraan";
import axios from "axios";
import BackgroundBox from "@/components/BackgroundBox";
import Testimoni from "../../../components/homepage/Testimoni";

const PageTemukanKami = () => {
	const [data, setData] = React.useState([]);
	const [dataTestimoni, setDataTestimoni] = React.useState([]);

	const fetchData = async () => {
		try {
			const [paketResponse, testimoniResponse] = await Promise.all([
				axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan`),
				axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/testimoni`),
			]);

			const paketData = paketResponse.data.data;
			const testimoniData = testimoniResponse.data.data;

			setData(paketData);
			setDataTestimoni(testimoniData);
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

				<div className="mt-10">
					<h1 className="text-3xl font-bold text-center">Paket Kemitraan</h1>
					<p className="text-center text-sm md:text-base mt-4 px-2 md:px-0">
						Membantu pelaku usaha pemula dalam memulai dan mengembangkan bisnis
						kuliner dengan menyediakan paket usaha yang terjangkau dan mudah
						diakses.
					</p>
					{data.length === 0 && (
						<p className="flex justify-center items-center text-center text-slate-500 mt-4 h-[400px]">
							Tidak ada paket kemitraan
						</p>
					)}
					<PaketKemitraan data={data} />
				</div>

				<div className="mt-28">
					<h1 className="text-3xl font-bold text-center">
						Sudah Siapkah Anda Menjadi Mitra Demiehan ?
					</h1>
					<p className="text-center text-sm md:text-base mt-4 px-2 md:px-0">
						Bergabunglah dengan kami untuk memulai perjalanan bisnis kuliner
						Anda! Kami menyediakan paket usaha yang terjangkau dan mudah
						diakses, dirancang khusus untuk membantu pelaku usaha pemula dalam
						memulai dan mengembangkan bisnis mereka dengan sukses.
					</p>
					{dataTestimoni.length === 0 && (
						<p className="flex justify-center items-center text-center text-slate-500 mt-4 h-[400px]">
							Tidak ada testimoni
						</p>
					)}
					<Testimoni data={dataTestimoni} />
				</div>
			</div>
		</section>
	);
};

export default PageTemukanKami;
