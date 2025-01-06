"use client";

import Image from "next/image";
import React from "react";
import Judul from "@/components/Judul";

const Tentang = () => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/informasi/1`
		);
		const data = await response.json();
		setData(data.informasi);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="md:w-full h-full" id="tentang">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="D'EMIEHAN" subText="Tentang Kami" />

					<div className="flex flex-col md:flex-row justify-between items-center mt-10">
						<div className="md:basis-1/3 w-[250px] bg-blue-50 rounded-custom2 md:ml-24">
							<Image
								src={data.gambar}
								width={500}
								height={500}
								alt="logo"
								className="object-cover p-6"
							/>
						</div>
						<div className="md:basis-1/2 px-4">
							<h1 className="font-bold text-3xl mb-2 hidden md:block">
								D&apos;emiehan
							</h1>
							<p className="text-justify px-4 md:px-0 md:text-justify text-sm md:text-base mt-4 md:mt-0">
								{data.deskripsi}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tentang;
