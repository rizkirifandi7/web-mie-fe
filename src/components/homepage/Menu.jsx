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
import { formatHarga } from "@/lib/formatHarga";
import { truncateText } from "@/lib/batasiText";

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
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto px-8 py-24 md:px-20 w-full h-full">
				<div className="flex flex-col justify-center items-center w-full">
					<Judul mainText="D'EMIEHAN" subText="Produk Kami" />

					<div className="w-full">
						{menuData.length > 0 ? (
							<div className="flex flex-col justify-center items-center pt-10">
								<Carousel
									plugins={[
										Autoplay({
											delay: 2000,
										}),
									]}
									className="w-full"
								>
									<CarouselContent>
										{menuData.map((menu) => (
											<CarouselItem
												key={menu.id}
												className="w-full md:basis-1/3 h-full"
											>
												<Card className="w-full h-full p-2">
													<div className="flex justify-center items-center bg-blue-50 overflow-hidden w-full h-[300px] object-cover rounded-t-md">
														<Image
															src={menu.gambar}
															width={500}
															height={250}
															className="object-fit w-full"
															alt="menu"
														/>
													</div>
													<div className="p-4 space-y-1">
														<div className="flex justify-between items-center h-full">
															<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
																{menu.nama}
															</h5>
															<p className="font-semibold text-blue-500">
																{formatHarga(menu.harga)}
															</p>
														</div>
														<p className="font-normal text-gray-700 dark:text-gray-400 truncate">
															{menu.deskripsi}
														</p>
													</div>
												</Card>
											</CarouselItem>
										))}
									</CarouselContent>
								</Carousel>
								<div className="mt-10">
									<Link href="/menu">
										<Button className="py-5 text-sm rounded-lg tracking-wider border border-white transform transition-transform duration-300 bg-blue-500 hover:bg-blue-600">
											Lihat Semua Menu
										</Button>
									</Link>
								</div>
							</div>
						) : (
							<p className="flex justify-center items-center text-base text-slate-500 text-center h-[300px]">
								Tidak ada menu
							</p>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Menu;
