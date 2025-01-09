import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { formatRupiah } from "@/lib/formatHarga";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PaketKemitraan = ({ data }) => {
	return (
		<div className="px-8">
			{data.map((item) => (
				<div
					key={item.id}
					className="flex flex-col md:flex-row justify-evenly items-center gap-16 mt-20"
				>
					<Carousel className="w-full max-w-sm">
						<CarouselContent>
							{item.gambar.map((gambar, index) => {
								return (
									<CarouselItem key={index}>
										<Image
											src={gambar.path}
											width="500"
											height="500"
											className="flex aspect-square items-center justify-center p-6 w-full h-full object-cover rounded-lg border"
											alt="paket kemitraan"
										/>
									</CarouselItem>
								);
							})}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
					<div className="flex flex-col">
						<h1 className="text-2xl font-bold mb-6 text-blue-500 capitalize">
							{item.jenis_kemitraan}
						</h1>
						<div className="flex flex-col gap-y-4 text-lg">
							<div className="flex items-center gap-4">
								<Image
									src="/kitchen.png"
									width="80"
									height="80"
									alt="chef hat"
								/>
								<p className="font-semibold text-lg w-[150px]">
									Perlengkapan Alat Dapur
								</p>
							</div>
							<div className="flex items-center gap-4">
								<Image src="/bahan.png" width="80" height="80" alt="chef hat" />
								<p className="font-semibold text-lg w-[150px]">
									Bahan Baku untuk 50 Porsi
								</p>
							</div>
							<p className="text-gray-500 text-lg">Ukuran : {item.ukuran}</p>
							<p className="text-xl font-bold">{formatRupiah(item.harga)}</p>
						</div>
						<div className="flex items-center gap-4">
							<Button
								className="w-fit bg-blue-500 py-5 mt-8 text-sm font-semibold capitalize"
								asChild
							>
								<Link href="/registrasi">Daftar Jadi Mitra Sekarang</Link>
							</Button>
							<Button
								className="w-fit bg-green-500 py-5 mt-8 text-sm font-semibold capitalize"
								asChild
							>
								<Link href="https://wa.link/dben6b">WhatsApp</Link>
							</Button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default PaketKemitraan;
