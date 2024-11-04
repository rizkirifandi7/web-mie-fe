import React from "react";
import Judul from "@/components/common/Judul";
import BGPattern from "@/assets/pattern.svg";
import Link from "next/link";

const Kontak = () => {
	return (
		<section
			id="kontak"
			className="w-full h-full bg-[#D5F022] bg-repeat"
			style={{ backgroundImage: `url(${BGPattern.src})` }}
		>
			<div className="md:max-w-screen-xl mx-auto py-36">
				<div className="">
					<Judul
						mainText="D'EMIEHAN"
						subText="KONTAK"
						mainTextColor="text-[#D5F022]"
						className="text-4xl md:text-7xl"
					/>
				</div>

				<div className="flex flex-col md:flex-row md:justify-between items-center pt-8 md:pt-16 gap-6 md:px-0 px-10">
					<div className="basis-1/2 ">
						<div className="flex flex-col justify-center items-center gap-4 p-6 border-2 border-black bg-white">
							<h1 className="font-bold text-center text-3xl md:text-4xl uppercase">
								Kerjasama dengan Kami
							</h1>
							<p className="font-bold uppercase text-base text-center">
								Mari berkolaborasi dengan D&apos;emiehan
							</p>
							<Link
								href="https://wa.me/628123456789"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-[#25D366] text-lg font-bold text-white text-center border-2 border-black uppercase hover:rotate-3"
							>
								Hubungi via WhatsApp
							</Link>
						</div>
					</div>
					<div className="basis-1/2">
						<div className="flex flex-col justify-center text-center items-center gap-4 p-4 border-2 border-black bg-white">
							<h1 className="text-3xl md:text-5xl font-bold text-outline-white bg-[#FF6141] w-fit p-2 -rotate-2">
								D&apos;emiehan
							</h1>
							<p className="text-2xl font-bold text-outline-white">
								Jl. Sumur, Bandung, Kota Bandung.
							</p>
							<p className="text-2xl font-bold text-outline-white">
								08123456789
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Kontak;
