"use client";

import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Judul from "@/components/Judul";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getAllMenu } from "@/services/api/menu";
import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";

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

	return (
		<section className="md:w-full h-full" id="menu">
			<div className="py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="D'EMIEHAN" subText="Menu" />

					<div className="flex flex-col justify-center items-center max-w-screen-sm md:max-w-screen-xl pt-10">
						{menuData.length > 0 ? (
							<Carousel
								plugins={[
									Autoplay({
										delay: 2000,
									}),
								]}
								className="w-full max-w-xs md:max-w-screen-2xl"
							>
								<CarouselContent>
									{menuData.map((menu) => (
										<CarouselItem
											key={menu.id}
											className="basis-[280px] md:basis-1/3 lg:basis-[320px]"
										>
											<Card className="bg-white">
												<div className="p-3">
													<Image
														src={`${menu.gambar}`}
														alt={menu.nama}
														width={250}
														height={250}
														className="w-full h-[200px] md:h-[220px] object-cover rounded-md"
													/>
												</div>
												<div className="px-3 pb-3">
													<h2 className="text-base font-bold text-left">
														{menu.nama}
													</h2>
													<p className="text-sm text-slate-500 text-left truncate">
														{menu.deskripsi}
													</p>
												</div>
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
								<Button className="py-5 text-sm rounded-lg tracking-wider border border-white transform transition-transform duration-300 bg-blue-500 hover:bg-blue-600">
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
