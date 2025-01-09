"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import { Card, CardContent } from "../ui/card";
import Judul from "../Judul";
import { Button } from "../ui/button";
import Link from "next/link";
import { BentoCard } from "../ui/bento-grid";
import { Notebook } from "lucide-react";
import BannerCard from "../BannerCard";

const Banner = () => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner`);
		const result = await response.json();

		setData(result.data);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="md:w-full h-full bg-repeat" id="tentang">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="D'EMIEHAN" subText="Informasi" />
				</div>
				{data.length > 0 ? (
					<div className="w-full h-full justify-center items-center mt-10 px-8">
						<Carousel
							opts={{
								align: "start",
							}}
							className="max-w-screen-sm md:max-w-screen-xl mx-auto"
						>
							<CarouselContent>
								{data.map((item, index) => (
									<CarouselItem key={index} className="w-full">
										<BannerCard
											name={item.judul}
											description={item.deskripsi}
											href={item.link}
											background={item.gambar}
											cta={"Lihat selengkapnya"}
										/>
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					</div>
				) : (
					<p className="flex justify-center items-center h-[300px] text-base text-slate-500">
						Tidak ada informasi
					</p>
				)}
			</div>
		</section>
	);
};

export default Banner;
