import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { formatRupiah } from "@/lib/formatRupiah";

const ItemMenu = ({ data }) => {
	const { addToCart, removeFromCart } = useCart();

	return (
		<div className="flex justify-between items-center border rounded-md p-3">
			<div className="flex items-center gap-2 w-full">
				<Image
					src={data.gambar}
					width={60}
					height={60}
					alt="menu"
					className="object-cover rounded-md w-auto h-auto"
				/>
				<div className="flex flex-col justify-b	etween gap-1">
					<h1 className="font-semibold text-base">
						{data.nama_menu}
					</h1>
					<p className="text-sm text-gray-500">{data.kategori}</p>
					<p className="text-sm">{data.quantity}x</p>
				</div>
			</div>
			<div className="flex flex-col justify-between items-end gap-4">
				<p className="font-semibold text-base">{formatRupiah(data.harga)}</p>
				<div className="flex justify-between items-center gap-2 border rounded-lg">
					<button
						className="p-2 border-l rounded-lg hover:bg-headingText hover:text-white"
						onClick={() => removeFromCart(data)}
					>
						<FaMinus />
					</button>
					<p className="px-2">{data.quantity}</p>
					<button
						className="p-2 border-r rounded-lg hover:bg-headingText hover:text-white"
						onClick={() => addToCart(data)}
					>
						<FaPlus />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemMenu;
