"use client";

import BackgroundBox from "@/components/BackgroundBox";
import Judul from "@/components/Judul";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PageArtikel = () => {
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

	const filterData = data.filter((item) => item.tipe === "artikel");

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-28 px-8 md:px-0">
				<BackgroundBox>
					<Judul mainText="D'EMIEHAN" subText="Artikel" />
				</BackgroundBox>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
					{filterData.map((item, index) => (
						<Link key={index} href={`/artikel/${item.id}`}>
							<Card className="flex flex-col p-2 transform transition duration-300 hover:scale-105">
								<div className="flex justify-center items-center h-[180px] mb-1 border rounded-md bg-slate-50 overflow-hidden">
									<Image
										src={item.gambar}
										width={300}
										height={300}
										alt="img"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
								<div className="flex flex-col gap-y-1 p-1">
									<h1 className="text-base font-semibold">{item.judul}</h1>
									<p className="text-xs text-slate-500">
										{new Date(item.createdAt).toLocaleString("id-ID", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										})}{" "}
										WIB
									</p>
								</div>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default PageArtikel;
