"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PageBeritaDetail = () => {
	const { id } = useParams();
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/berita/${id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setData(data.berita);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-lg mx-auto py-20 px-8 md:px-0">
				<Button variant="outline" className="mb-4" asChild>
					<Link href="/berita" className="">
						<ArrowLeft />
						Kembali
					</Link>
				</Button>
				<div className="flex flex-col gap-4 border w-full rounded-md p-4">
					<div className="flex justify-center items-center w-full h-[250px] md:h-[500px] rounded-md border">
						<Image
							src={data.gambar}
							width={1000}
							height={500}
							alt="img"
							className="w-auto h-auto object-cover"
						/>
					</div>
					<h1 className="text-2xl font-bold">{data.judul}</h1>
					<p className="">{parse(`${data.isi}`)}</p>
				</div>
			</div>
		</section>
	);
};

export default PageBeritaDetail;
