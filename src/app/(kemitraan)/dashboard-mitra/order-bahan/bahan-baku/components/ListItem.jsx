import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatRupiah";

const ListItem = ({ data, removeItemFromCart }) => {
	return (
		<div className="flex flex-col gap-2 border-y mt-4 py-4">
			{data.map((item, index) => (
				<Card
					className="flex justify-between items-center p-4 shadow-none h-full"
					key={index}
				>
					<div className="space-y-1">
						<h1 className="text-sm">{item.nama_bahan}</h1>
						<p className="text-xs text-slate-500">{item.jumlah}</p>
						<div className="inline-flex items-center gap-2">
							<p className="text-sm font-bold ">{formatRupiah(item.harga)}</p>
							<p className="font-normal text-sm">x{item.quantity}</p>
						</div>
					</div>
					<div className="">
						<Button
							size="icon"
							variant="destructive"
							onClick={() => removeItemFromCart(item)}
							className="h-8 w-8"
						>
							<FiTrash2 />
						</Button>
					</div>
				</Card>
			))}
		</div>
	);
};

export default ListItem;
