"use client";

import Judul from "@/components/Judul";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PageBerita = () => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/berita`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setData(data.berita);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-28 px-8 md:px-0">
				<div className="flex flex-col justify-center items-center w-full h-[200px] rounded-lg bg-center bg-no-repeat bg-cover bg-[url('/bg.jpg')] bg-gray-700 bg-blend-multiply text-white">
					<Judul mainText="D'EMIEHAN" subText="Berita" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
					{data.map((item, index) => (
						<Card className="flex flex-col h-full p-1" key={index}>
							<div className="flex justify-center items-center w-full mb-1 border bg-slate-50">
								<Image
									src={item.gambar}
									width={150}
									height={150}
									alt="img"
									className="w-auto h-auto object-cover rounded-md"
								/>
							</div>
							<div className="p-1">
								<h1 className="text-base font-semibold mb-1">{item.judul}</h1>
								<Link
									href={`/berita/${item.id}`}
									className="text-xs p-1 border rounded-md hover:bg-slate-50"
								>
									Lihat Detail
								</Link>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default PageBerita;
