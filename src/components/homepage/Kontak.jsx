"use client";
import React from "react";
import Judul from "@/components/Judul";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

const Kontak = () => {
	const [kontak, setKontak] = React.useState({});
	const [cabang, setCabang] = React.useState([]);

	const fetchData = async () => {
		try {
			const [cabangResponse, kontakResponse] = await Promise.all([
				axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cabang`),
				axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/beranda/1`),
			]);

			const cabangData = await cabangResponse.data;
			const kontakData = await kontakResponse.data;	

			setCabang(cabangData);
			setKontak(kontakData.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<section id="kontak" className="w-full h-full ">
			<div className="md:max-w-screen-xl mx-auto py-24 px-8 md:px-14">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="DEMIEHAN" subText="Kontak" />
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center mt-14 gap-x-10">
					<div className="w-full md:basis-1/3 relative">
						<HeroVideoDialog
							className="dark:hidden block "
							animationStyle="from-center"
							videoSrc="/intro.mp4"
							thumbnailSrc="/logobrandfull.png"
							thumbnailAlt="Hero Video"
						/>
						<HeroVideoDialog
							className="hidden dark:block"
							animationStyle="from-center"
							videoSrc="/intro.mp4"
							thumbnailSrc="/logobrandfull.png"
							thumbnailAlt="Hero Video"
						/>
					</div>
					<div className="w-full md:basis-1/2 mt-10 md:mt-0">
						<h1 className="text-2xl font-bold">Hubungi Kami</h1>
						<p className="text-base text-slate-500">
							Hubungi kami untuk informasi lebih lanjut atau jika Anda memiliki
							pertanyaan.
						</p>
						<div className="flex flex-col gap-y-4 mt-8">
							<div className="border-t pt-4">
								<h1 className="text-lg font-semibold">Email</h1>
								<p className="text-base">demiehan@gmail.com</p>
							</div>
							<div className="border-y py-4">
								<h1 className="text-lg font-semibold">Telepon</h1>
								<p className="text-base">{kontak.nomor}</p>
							</div>
							<div className="border-b pb-4">
								<h1 className="text-lg font-semibold">Alamat</h1>
								<p className="text-base">
									Jl. Pasir Kaliki Barat No.01, RT.10/RW.15, Sadang Serang,
									Kecamatan Coblong, Kota Bandung, Jawa Barat 40133
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-4 justify-between items-start border h-full w-full p-4 mt-14 rounded-lg">
					<div className="basis-1/3 p-4">
						<p className="text-slate-500">Lokasi Kami</p>
						<h1 className="text-xl font-semibold">Temukan Mitra Kami</h1>
					</div>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
						{cabang.map((item) => (
							<div className="flex flex-col gap-1" key={item.id}>
								<h1 className="text-base font-semibold">{item.nama_cabang}</h1>
								<p className="text-sm text-slate-600 font-medium">
									{item.alamat}
								</p>
								<a
									href={item.link_gmap}
									className="text-sm inline-flex items-center gap-1"
								>
									Lihat lokasi <ArrowUpRight size={14} />
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Kontak;
