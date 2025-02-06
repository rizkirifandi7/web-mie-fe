"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
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
		<section
			id="beranda"
			className="relative bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply"
			style={{
				backgroundImage: `url(${data.background ? data.background : "bg.jpg"})`,
				backgroundSize: "cover",
			}}
		>
			<div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-44">
				<div className="flex justify-center items-center mb-4">
					<Image
						src={data.gambar ? data.gambar : "/logobrand.png"}
						width={300}
						height={300}
						className="object-fit"
						alt="Demiehan Logo"
					/>
				</div>
				<h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
					{data.judul}
				</h1>
				<p className="mb-8 text-sm font-normal text-gray-300 md:text-base sm:px-16 lg:px-48">
					{data.deskripsi}
				</p>
				<div className="flex justify-center items-center gap-4">
					<Button asChild className="w-fit bg-blue-500 md:py-6">
						<Link href="/kemitraan">Gabung Kemitraan</Link>
					</Button>
					<Button
						asChild
						className="w-fit md:py-6 bg-transparent text-white"
						variant="outline"
					>
						<Link href="/menu">Lihat Menu</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
