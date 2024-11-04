import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BGPattern from "@/assets/pattern.svg";
import {
	MdOutlineAccessTime,
	MdOutlineLocationOn,
	MdOutlinePhoneInTalk,
} from "react-icons/md";
import InfoCard from "@/components/common/InfoCard";
import LogoBrand from "@/assets/logo.svg";

const Hero = () => {
	return (
		<section
			id="beranda"
			className="w-full md:w-full h-full bg-[#50D9FF]"
			style={{
				backgroundImage: `url(${BGPattern.src})`,
				backgroundRepeat: "repeat",
				backgroundSize: "auto",
			}}
		>
			<div className="flex flex-col justify-center items-center mx-auto max-w-screen-sm md:max-w-screen-xl text-center z-10 pt-10 px-8 md:px-0 md:pt-36">
				<div className="mb-4 mt-16 z-10">
					<Image src={LogoBrand} width="150" height="150" alt="logo brand" />
				</div>
				<h1 className="flex flex-col my-4 text-[40px] md:text-[80px] font-extrabold tracking-tight leading-none text-black text-outline-white z-10 uppercase">
					<span>D&apos;emiehan</span>
					<span>Mie Pedas, Bikin Kamu Panas!</span>
				</h1>
				<div className="flex justify-center items-center gap-4 mt-4 z-10">
					<Button className="px-8 py-6 text-base font-bold tracking-wider border border-white transform transition-transform duration-300 bg-blue-500 hover:bg-blue-600  hover:rotate-3 rounded-none uppercase">
						Lihat Menu
					</Button>
					<Button className="px-8 py-6 text-base font-bold tracking-wider bg-transparent border border-white transform transition-transform duration-300 hover:bg-gray-500 hover:rotate-3 rounded-none uppercase">
						Hubungi Kami
					</Button>
				</div>

				<div className="w-full mt-4 mb-12 md:px-0 px-14 md:gap-0 gap-4 flex flex-col md:flex-row justify-center items-center md:border-2 border-white text-center uppercase md:mt-24">
					<InfoCard
						icon={<MdOutlineAccessTime />}
						title="10.00 - 22.00 WIB."
						desc="Operasional"
					/>
					<InfoCard
						icon={<MdOutlineLocationOn />}
						title="Jl. Sumur, Bandung, Kota Bandung."
						desc="Lokasi"
					/>
					<InfoCard
						icon={<MdOutlinePhoneInTalk />}
						title="08123456789"
						desc="Kontak"
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
