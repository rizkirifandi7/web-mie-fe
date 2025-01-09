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
					className="h-full rounded-md p-2 border transform transition-transform duration-300 hover:scale-105"
				>
					<div className="flex justify-center items-center rounded-md border h-[220px] overflow-hidden bg-blue-50">
						<Image
							src={`${menu.gambar}`}
							alt={menu.nama}
							width={300}
							height={300}
							className="w-full h-full object-contain rounded-md"
						/>
					</div>
					<div className="px-2 py-2">
						<div className="flex justify-between items-center">
							<p className="font-bold text-base">{menu.nama}</p>
							<p className="text-base font-bold uppercase text-blue-500 ">
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
