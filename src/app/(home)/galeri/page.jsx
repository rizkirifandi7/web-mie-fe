"use client";
import Judul from "@/components/Judul";
import React from "react";

import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";
import BackgroundBox from "@/components/BackgroundBox";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const PageGaleri = () => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/galeri`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setData(data.data);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-28 px-8 md:px-0">
				<BackgroundBox>
					<Judul mainText="D'EMIEHAN" subText="Galeri" />
				</BackgroundBox>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
					{data.map((item, idx) => (
						<Link href={`/galeri/${item.id}`} key={idx}>
							<Card className="border-none shadow-none">
								<div className="aspect-square border rounded-lg transform transition duration-300 hover:scale-105 h-full">
									<Image
										src={item.gambar[0]?.path || "/logobrand.png"}
										width={250}
										height={250}
										alt={item.judul}
										className="object-cover w-full h-full rounded-lg"
									/>
								</div>
								<div className="flex flex-col gap-0.5 p-2">
									<h1 className="text-base font-semibold">{item.judul}</h1>
									<p className="text-sm truncate">{item.gambar.length}</p>
								</div>
							</Card>
						</Link>
					))}
				</div>
				{data.length === 0 && (
					<div className="flex justify-center items-center h-[400px]">
						<p>Tidak ada galeri</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default PageGaleri;
