"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/formatRupiah";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const CardMenu = ({ addToCart, removeFromCart, data, cartItem }) => {
	return (
		<Card
			key={data.id}
			className={`flex flex-col rounded-md h-[300px] shadow-none ${
				cartItem ? "border-orange-500" : ""
			}`}
		>
			<div className="flex justify-center items-center h-full bg-slate-50 p-2 rounded-md overflow-hidden">
				<Image
					src={data.gambar}
					width={500}
					height={500}
					alt={data.nama_menu}
					className="object-cover rounded-md w-full h-full overflow-hidden"
				/>
			</div>

			<div className="px-3 py-3">
				<h1 className="text-base font-semibold">{data.nama_menu}</h1>
				<p className="text-sm text-muted-foreground truncate">
					{data.deskripsi}
				</p>

				<div className="flex justify-between items-center mt-3">
					<p className="text-base font-bold">{formatRupiah(data.harga)}</p>
					<div className="flex items-center gap-2">
						{cartItem && cartItem.quantity > 0 && (
							<>
								<Button
									variant="outline"
									size="icon"
									onClick={() => removeFromCart(data)}
								>
									<Minus />
								</Button>
								<p className="px-1">{cartItem.quantity}</p>
							</>
						)}
						<Button
							variant="outline"
							size="icon"
							onClick={() => addToCart(data)}
						>
							<Plus />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CardMenu;
