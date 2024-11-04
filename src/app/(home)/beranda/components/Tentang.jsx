import Image from "next/image";
import React from "react";
import logobrand from "@/assets/logobrand.png";
import BGPattern from "@/assets/pattern.svg";
import Judul from "@/components/common/Judul";

const Tentang = () => {
	return (
		<section
			className="md:w-full h-full bg-[#FF6141] bg-repeat"
			id="tentang"
			style={{ backgroundImage: `url(${BGPattern.src})` }}
		>
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-36">
				<div className="flex flex-col justify-center items-center">
					<Judul
						mainText="D'EMIEHAN"
						subText="TENTANG KAMI"
						mainTextColor="text-[#FF6141]"
						className={"text-4xl md:text-7xl"}
					/>

					<div className="flex flex-col md:flex-row justify-center items-center pt-10">
						<div className="md:basis-1/2 w-[250px]">
							<Image src={logobrand} alt="logo" className="object-cover" />
						</div>
						<div className="md:basis-1/2 mt-4 flex flex-col justify-center items-center px-10 gap-4 text-justify uppercase">
							<h1 className="hidden md:block md:text-5xl font-bold text-outline-white bg-purple-600 w-fit p-2 -rotate-2">
								D&apos;emiehan
							</h1>
							<p className="text-lg md:text-2xl font-bold text-outline-white">
								D&apos;emihan lahir dari keinginan untuk memberikan lebih dari
								sekadar mie pedas. Kami ingin menjadi teman dalam setiap momen
								berani kamu—dari menikmati makan siang yang menggugah hingga
								menghadapi tantangan pedas yang seru. Dengan berbagai level
								kepedasan yang bisa disesuaikan, D&apos;emihan memberikan
								kebebasan kepada kamu untuk memilih sensasi yang paling cocok
								dengan selera.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tentang;
