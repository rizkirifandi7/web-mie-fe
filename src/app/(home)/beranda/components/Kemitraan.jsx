"use client"
import Judul from "@/components/Judul";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Kemitraan = () => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraans`
		);
		const data = await response.data;
		console.log(data);
		setData(data);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="md:w-full h-full bg-repeat" id="tentang">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="D'EMIEHAN" subText="Kemitraan" />
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center mt-14 mx-14">
					<div className="flex flex-col">
						<h1 className="font-bold text-2xl mb-2">
							Mari Bermitra Dengan Demiehan
						</h1>
						<p className="text-slate-500">Keuntungan selama bermitra dengan Demiehan :</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
							<p className="inline-flex gap-2 border p-2 rounded-lg hover:bg-slate-50">
								<span className="text-blue-400">
									<Check strokeWidth={3} />
								</span>{" "}
								Memberdayakan Wirausahawan
							</p>
							<p className="inline-flex gap-2 border p-2 rounded-lg hover:bg-slate-50">
								<span className="text-blue-400">
									<Check strokeWidth={3} />
								</span>{" "}
								Kualitas Terbaik
							</p>
							<p className="inline-flex gap-2 border p-2 rounded-lg hover:bg-slate-50">
								<span className="text-blue-400">
									<Check strokeWidth={3} />
								</span>{" "}
								Pelatihan dan Dukungan
							</p>
							<p className="inline-flex gap-2 border p-2 rounded-lg hover:bg-slate-50">
								<span className="text-blue-400">
									<Check strokeWidth={3} />
								</span>{" "}
								Inovasi Berkelanjutan
							</p>
							<p className="inline-flex gap-2 border p-2 rounded-lg hover:bg-slate-50">
								<span className="text-blue-400">
									<Check strokeWidth={3} />
								</span>{" "}
								Membangun Komunitas
							</p>
						</div>
						<Button className="w-full md:w-fit py-5 mt-6 bg-blue-500">
							<Link href="/kemitraan">Lihat Selengkapnya</Link>
						</Button>
					</div>
					<Carousel plugins={[
						Autoplay({
							delay: 2000,
						}),
					]} className="w-full md:w-[500px] mt-10 md:mt-0">
						<CarouselContent>
							{data.map((item) => (
								<CarouselItem key={item.id}>
									<div className="flex flex-col justify-center items-center bg-blue-50 h-[400px] w-[280px] md:w-[500px] rounded-custom">
										<h1 className="mb-4 font-semibold text-xl ">{item.jenis_kemitraan}</h1>
										<Image
											src={item.gambar}
											width={500}
											height={500}
											alt="logo"
											className="object-cover"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>

				<div className="flex flex-col justify-center items-center h-[250px]  mt-14 rounded-lg mx-14 bg-center bg-no-repeat bg-cover bg-[url('/bg.jpg')] bg-gray-700 bg-blend-multiply">
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
				</div>
			</div>
		</section>
	);
};

export default Kemitraan;
