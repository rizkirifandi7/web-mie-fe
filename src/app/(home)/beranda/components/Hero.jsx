import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<section
			id="beranda"
			className="bg-center bg-no-repeat bg-cover bg-[url('/bg.jpg')] bg-gray-700 bg-blend-multiply"
		>
			<div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-44">
				<div className="flex justify-center items-center mb-4">
					<Image
						src="/logobrand.png"
						width={200}
						height={200}
						alt="Demiehan Logo"
					/>
				</div>
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
					Mie Pedas, Bandung Banget!
				</h1>
				<p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
					Menjadi perusahaan terkemuka dalam penyediaan solusi usaha kuliner di
					Indonesia, khususnya dalam sektor gerobak dan kios, dengan fokus pada
					aksesibilitas dan kualitas.
				</p>
				<div className="flex justify-center items-center gap-4">
					<Button asChild className="w-full md:w-fit bg-blue-500  py-6">
						<Link href="/kemitraan">Gabung Kemitraan</Link>
					</Button>
					<Button asChild className="w-full md:w-fit py-6 bg-transparent text-white" variant="outline">
						<Link href="/menu">Lihat Menu</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
