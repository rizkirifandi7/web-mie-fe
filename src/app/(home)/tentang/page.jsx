"use client";
import BackgroundBox from "@/components/BackgroundBox";
import Judul from "@/components/Judul";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
							className="object-cover"
						/>
						<p className="text-justify">{data.deskripsi}</p>
					</div>

					<Card className="w-full">
						<CardHeader>
							<CardTitle>Sertifikat</CardTitle>
							<CardDescription>Demiehan</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
							{sertifikat.map((item, idx) => (
								<div
									key={idx}
									className="flex items-start gap-4 border rounded-md p-2"
								>
									<Image
										src={item.gambar}
										width={80}
										height={80}
										alt="sertifikat"
										className="flex justify-center items-center object-fit rounded-md border"
									/>
									<p className="flex text-sm text-left items-start w-full">
										{item.keterangan}
									</p>
								</div>
							))}
						</CardContent>
						{sertifikat.length === 0 && (
							<p className="text-center text-sm text-slate-500 my-4">
								Tidak ada sertifikat
							</p>
						)}
					</Card>

					<div className="flex items-start justify-center w-full gap-4 mt-10 h-full">
						<Card className="w-full h-full">
							<CardHeader>
								<CardTitle className="text-2xl font-bold mt-4">Visi</CardTitle>
								<CardDescription>Demiehan</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-justify">{data.visi}</p>
							</CardContent>
						</Card>
						<Card className="w-full h-full">
							<CardHeader>
								<CardTitle className="text-2xl font-bold mt-4">Misi</CardTitle>
								<CardDescription>Demiehan</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-justify">{data.misi}</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageTentang;
