import Image from "next/image";
import React from "react";
import Judul from "@/components/Judul";

const Tentang = () => {
	return (
		<section className="md:w-full h-full" id="tentang">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center">
					<Judul mainText="D'EMIEHAN" subText="Tentang Kami" />

					<div className="flex flex-col md:flex-row justify-between items-center mt-10">
						<div className="md:basis-1/3 w-[250px] bg-blue-50 rounded-custom2 md:ml-24">
							<Image
								src="/logobrandfull.png"
								width={500}
								height={500}
								alt="logo"
								className="object-cover"
							/>
						</div>
						<div className="md:basis-1/2 px-4">
							<h1 className="font-bold text-3xl mb-4 hidden md:block">D&apos;emiehan</h1>
							<p className="text-justify px-4 md:px-0 md:text-justify text-sm md:text-base font-medium mt-4 md:mt-0">
								D&apos;emiehan adalah perusahaan yang berdedikasi untuk menjadi
								mitra ideal bagi para pelaku usaha yang ingin memulai bisnis
								gerobak atau kios dengan konsep jual putus kepada mitra. Kami
								menawarkan solusi usaha skala kecil yang terjangkau,
								memungkinkan setiap orang untuk mengeksplorasi dunia kuliner
								tanpa beban finansial yang berat. Dengan pendekatan yang praktis
								dan inovatif, D&apos;emiehan menyediakan desain gerobak menarik,
								bahan baku berkualitas, dan pelatihan menyeluruh untuk
								memastikan setiap mitra kami dapat sukses dalam bisnis mereka.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tentang;
