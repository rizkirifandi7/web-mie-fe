"use client";

import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PageDetailGaleri = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/galeri/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			setData(data.data);
		};

		fetchData();
	}, [id]);

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-20 px-8 md:px-0">
				<Link href="/galeri" asChild>
					<Button variant="ghost" className="mb-4">
						<ArrowLeft />
						Kembali
					</Button>
				</Link>
				<Card className="border w-full rounded-md">
					<CardHeader className="border-b">
						<CardTitle>{data.judul}</CardTitle>
						<CardDescription>
							{data.deskripsi}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="columns-2 gap-4 sm:columns-3 pt-6">
							{data.gambar?.map((item, idx) => (
								<BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
									<div className="rounded-md overflow-hidden transform transition duration-300 hover:scale-105">
										<Image
											className="size-full rounded-md object-contain bg-blue-50 border "
											src={item.path}
											width={500}
											height={500}
											alt={`Random stock image ${idx + 1}`}
										/>
									</div>
								</BlurFade>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default PageDetailGaleri;
