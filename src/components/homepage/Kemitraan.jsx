"use client";
import Judul from "@/components/Judul";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { Check, ImageDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import BackgroundBox from "../BackgroundBox";

const Kemitraan = () => {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan`
				);
				setData(response.data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="md:w-full h-full bg-repeat" id="tentang">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="D'EMIEHAN" subText="Kemitraan" />
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center mt-14 mx-8 md:mx-14">
					<div className="flex flex-col">
						<h1 className="font-bold text-2xl mb-2">
							Mari Bermitra Dengan Demiehan
						</h1>
						<p className="text-slate-500">
							Keuntungan selama bermitra dengan Demiehan :
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
							{[
								"Memberdayakan Wirausahawan",
								"Kualitas Terbaik",
								"Pelatihan dan Dukungan",
								"Inovasi Berkelanjutan",
								"Membangun Komunitas",
							].map((benefit, index) => (
								<p
									key={index}
									className="inline-flex gap-2 border p-2 rounded-lg hover:bg-slate-50"
								>
									<span className="text-blue-400">
										<Check strokeWidth={3} />
									</span>{" "}
									{benefit}
								</p>
							))}
						</div>
						<Button className="w-full md:w-fit py-5 mt-6 bg-blue-500">
							<Link href="/kemitraan">Lihat Selengkapnya</Link>
						</Button>
					</div>
					{data.length > 0 ? (
						<Carousel
							plugins={[
								Autoplay({
									delay: 2000,
								}),
							]}
							className="w-full md:w-[500px] mt-10 md:mt-0"
						>
							<CarouselContent>
								{data.flatMap((item) =>
									item.gambar.map((img, index) => (
										<CarouselItem key={`${item.id}-${index}`}>
											<Card className="flex justify-center overflow-hidden items-center rounded-md w-full object-cover">
												<Image
													src={img.path}
													width={450}
													height={450}
													alt="logo"
													className="object-cover p-6"
												/>
											</Card>
										</CarouselItem>
									))
								)}
							</CarouselContent>
						</Carousel>
					) : (
						<div className="flex flex-col justify-center items-center w-[380px] h-[380px] md:w-[400px] md:h-[400px] mt-6 md:mt-0 bg-slate-50 rounded-lg">
							<ImageDown size={40} />
							<p>Tidak ada Gambar</p>
						</div>
					)}
				</div>

				<div className="md:px-14">
					<BackgroundBox className="flex flex-col justify-center items-center w-full mx-auto h-[250px] mt-14 md:rounded-md">
						<h1 className="text-2xl font-bold text-white text-center">
							Tertarik Bergabung Dengan Kemitraan Demiehan ?
						</h1>
						<div className="flex gap-x-4">
							<Button className="w-full md:w-fit py-5 mt-10 bg-blue-500">
								<Link href="/registrasi">Daftar Sekarang</Link>
							</Button>
							<Button className="w-full md:w-fit py-5 mt-10 bg-green-500">
								<Link href="https://wa.link/dben6b">WhatsApp</Link>
							</Button>
						</div>
					</BackgroundBox>
				</div>
			</div>
		</section>
	);
};

export default Kemitraan;
