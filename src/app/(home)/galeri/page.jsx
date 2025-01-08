"use client";
import Judul from "@/components/Judul";
import React from "react";

import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";
import BackgroundBox from "@/components/BackgroundBox";

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
		setData(data.galeri);
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

				<div className="mt-20">
					{data.length > 0 && (
						<div className="columns-2 gap-4 sm:columns-3">
							{data.map((item, idx) => (
								<BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
									<div className="relative group">
										<Image
											className="mb-4 size-full rounded-lg object-contain group-hover:opacity-75"
											src={item.gambar}
											width={800}
											height={600}
											alt={`Random stock image ${idx + 1}`}
										/>
										<span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											{item.judul}
										</span>
									</div>
								</BlurFade>
							))}
						</div>
					)}
					<div className="flex justify-center items-center h-[400px]">
						<p>Tidak ada galeri</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageGaleri;
