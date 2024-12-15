import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatHarga } from "../../../../lib/formatHarga";

const CardMenu = ({ filterMenu }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
			{filterMenu.map((menu) => (
				<Card
					key={menu.id}
					className="h-full rounded-lg border transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
				>
					<div className="rounded-lg">
						<Image
							src={`${menu.gambar}`}
							alt={menu.nama}
							width={300}
							height={250}
							className="w-full h-[250px] object-cover p-4 rounded-lg"
						/>
					</div>
					<div className="px-4 pb-4">
						<div className="flex justify-between items-center">
							<p className="font-bold text-base">{menu.nama}</p>
							<p className="text-base font-bold uppercase">
								{formatHarga(menu.harga)}
							</p>
						</div>
						<p className="text-sm text-slate-500">{menu.deskripsi}</p>
					</div>
				</Card>
			))}
		</div>
	);
};

export default CardMenu;
