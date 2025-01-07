"use client";
import BackgroundBox from "@/components/BackgroundBox";
import Judul from "@/components/Judul";
import Image from "next/image";
import React from "react";

const PageTentang = () => {
	const [data, setData] = React.useState([]);
	const [sertifikat, setSertifikat] = React.useState([]);

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/informasi/1`
		);
		const data = await response.json();
		setData(data.informasi);
	};

	const fetchSertifikat = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/sertifikat`
		);
		const data = await response.json();
		setSertifikat(data.data);
	};

	React.useEffect(() => {
		fetchData();
		fetchSertifikat();
	}, []);

	return (
		<section className="w-full md:w-full min-h-screen bg-white">
			<div className="max-w-screen-sm md:max-w-screen-lg mx-auto py-28 px-8 md:px-0">
				<BackgroundBox>
					<Judul mainText="D'EMIEHAN" subText="Tentang Kami" />
				</BackgroundBox>

				<div className="flex flex-col justify-center items-center mt-10 text-center gap-4">
					<div className="flex flex-col md:flex-row items-center gap-4">
						<Image
							src={data.gambar ? data.gambar : "/logobrand.png"}
							width={350}
							height={350}
							alt="logo"
							className="object-cover w-auto h-auto"
						/>
						<p className="text-justify">{data.deskripsi}</p>
					</div>

					<div className="w-full">
						<h1 className="text-xl font-bold mt-4">Sertifikat</h1>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
							{sertifikat.map((item, idx) => (
								<div
									key={idx}
									className="flex items-center gap-4 border rounded-md p-2"
								>
									<Image
										src={item.gambar}
										width={80}
										height={80}
										alt="sertifikat"
										className="w-auto h-auto object-cover rounded-md border"
									/>
									<p>{item.keterangan}</p>
								</div>
							))}
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h1 className="text-xl font-bold mt-4">Visi</h1>
						<p className="text-justify">{data.visi}</p>
					</div>

					<div className="flex flex-col gap-4">
						<h1 className="text-xl font-bold mt-4">Misi</h1>
						<p className="text-justify">{data.misi}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageTentang;
