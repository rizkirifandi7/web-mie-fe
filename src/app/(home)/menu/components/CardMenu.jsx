import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatHarga } from "../utils/formatHarga";

const CardMenu = ({ filterMenu, judul }) => {
	const backgroundColors = [
		"#5AD7FF",
		"#D5F022",
		"#FF6141",
		"#FF419C",
		"#FFA841",
		"#41FFD3",
		"#FFD341",
	];

	return (
		<div className="mt-16">
			<h2 className="font-extrabold text-outline-white rotate-2 text-2xl uppercase bg-[#ff2600] p-2 w-fit mb-6">
				{judul}
			</h2>
			<div className="grid grid-cols-1 max-w-xs md:max-w-screen-2xl mx-auto md:grid-cols-4 gap-5 justify-center items-center">
				{filterMenu.map((menu, index) => (
					<Card
						key={menu.id}
						className="h-full rounded-none border-2 border-white transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
					>
						<CardHeader>
							<Image
								src={`http://localhost:8000/view/${menu.gambar}`}
								alt={menu.nama}
								width={300}
								height={250}
								className="w-full h-[250px] object-cover"
							/>
						</CardHeader>
						<CardContent className="border-t-2 border-white space-y-1 uppercase">
							<CardTitle className="flex justify-between">
								<span className="font-extrabold text-xl">{menu.nama}</span>
								<span className="text-lg font-bold">
									{formatHarga(menu.harga)}
								</span>
							</CardTitle>
							<p className="text-sm text-black font-medium mb-3">
								{menu.deskripsi}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default CardMenu;
