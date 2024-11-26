"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import Image from "next/image";
import BGPattern from "@/assets/pattern.svg";
import { Button } from "@/components/ui/button";
import Judul from "@/components/common/Judul";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getAllMenu } from "@/services/api/menu";
import { toast } from "sonner";

const Menu = () => {
	const [menuData, setMenuData] = useState([]);

	const fetchData = useCallback(async () => {
		try {
			const data = await getAllMenu();
			setMenuData(data);
		} catch (error) {
			console.error("Error fetching menu data:", error);
			toast.error("Gagal mengambil data menu.");
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const backgroundColors = [
		"#5AD7FF",
		"#D5F022",
		"#FF6141",
		"#FF419C",
		"#FFA841",
		"#41FFD3",
		"#FFD341",
	];

	return (
		<section
			className="md:w-full h-full bg-[#FFE920]"
			id="menu"
			style={{
				backgroundImage: `url(${BGPattern.src})`,
				backgroundRepeat: "repeat",
				backgroundSize: "auto",
			}}
		>
			<div className="pt-36 pb-24">
				<div className="flex flex-col justify-center items-center ">
					<Judul
						mainText="D'EMIEHAN"
						subText="Menu Terpopuler"
						mainTextColor="text-[#FFE920]"
						className="text-4xl md:text-7xl"
					/>

					<div className="flex flex-col justify-center items-center max-w-screen-sm md:max-w-screen-xl pt-16 uppercase">
						{menuData.length > 0 ? (
							<Carousel className="w-full max-w-xs md:max-w-screen-2xl">
								<CarouselContent>
									{menuData.map((menu, index) => (
										<CarouselItem
											key={menu.id}
											className="basis-[280px] md:basis-1/2 lg:basis-[360px]"
										>
											<Card
												className="h-[350px] md:h-[450px] rounded-none border-2 border-white transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
												style={{
													backgroundColor:
														backgroundColors[index % backgroundColors.length],
												}}
											>
												<CardHeader>
													<Image
														src={`http://localhost:8000/view/${menu.gambar}`}
														alt={menu.nama}
														width={300}
														height={250}
														className="w-full h-[200px] md:h-[250px] object-cover"
													/>
												</CardHeader>
												<CardContent className="border-t-2 border-white">
													<CardTitle className="text-3xl md:text-5xl font-extrabold pt-4 text-outline-white text-center">
														{menu.nama}
													</CardTitle>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						) : (
							<p className="text-2xl font-bold text-center my-16">
								No menu items available
							</p>
						)}

						<div className="mt-14">
							<Link href="/menu">
								<Button className="px-8 py-6 text-base font-bold tracking-wider border border-white transform transition-transform duration-300 bg-blue-500 hover:bg-blue-600  hover:rotate-3 rounded-none uppercase">
									Lihat Semua Menu
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Menu;
