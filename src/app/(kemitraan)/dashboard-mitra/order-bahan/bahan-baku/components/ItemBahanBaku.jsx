import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/formatRupiah";
import React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

const ItemBahanBaku = ({ data, cartBahanBaku, removeFromCart, addToCart }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 border-t pt-4">
			{data.map((item, index) => {
				// Get quantity of this item from cart
				const cartItem = cartBahanBaku.find((cart) => cart.id === item.id);
				const quantity = cartItem ? cartItem.quantity : 0;

				return (
					<Card
						className={`flex justify-between gap-2 items-center p-4 shadow-none ${
							quantity > 0 ? "border-orange-500" : ""
						}`}
						key={index}
					>
						<div className="space-y-1">
							<h1 className="text-sm font-medium">{item.nama_bahan}</h1>
							<p className="text-xs text-slate-500">{item.jumlah}</p>
							<p className="text-sm font-bold ">{formatRupiah(item.harga)}</p>
						</div>
						<div className="flex gap-2 items-center">
							{quantity > 0 && (
								<>
									<Button
										size="icon"
										variant="outline"
										onClick={() => removeFromCart(item)}
										disabled={quantity === 0}
										className="h-8 w-8"
									>
										<LuMinus />
									</Button>
									<p className="px-2">{quantity}</p>
								</>
							)}
							<Button
								size="icon"
								variant="outline"
								onClick={() => addToCart(item)}
								className="h-8 w-8"
							>
								<LuPlus />
							</Button>
						</div>
					</Card>
				);
			})}
		</div>
	);
};

export default ItemBahanBaku;
