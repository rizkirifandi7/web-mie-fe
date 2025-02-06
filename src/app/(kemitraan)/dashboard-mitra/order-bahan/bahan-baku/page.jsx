"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartBahanBaku } from "@/hooks/useCartBahan";
import axios from "axios";
import React from "react";
import DetailTotal from "./components/DetailTotal";
import ListItem from "./components/ListItem";
import ItemBahanBaku from "./components/ItemBahanBaku";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const PageBahanBaku = () => {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const {
		cartBahanBaku,
		addToCart,
		removeFromCart,
		removeItemFromCart,
		getCartTotal,
		clearCart,
	} = useCartBahanBaku();

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/bahan-baku`
			);
			setData(response.data.data);
		};

		fetchData();
	}, []);

	const orderBahanBaku = async () => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/order-bahan`,
				{
					items: cartBahanBaku.map((item) => ({
						id_bahan_baku: item.id,
						quantity: item.quantity,
						harga: item.harga,
					})),
					status: "pending",
					total_harga: getCartTotal(),
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("auth_session")}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				clearCart();
				toast.success("Berhasil order bahan baku");
			}
		} catch (error) {
			console.error("Error order bahan baku:", error);
			toast.error("Gagal order bahan baku");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Link href="/dashboard-order/order-bahan">
				<Button variant="ghost" className="mb-4">
					<FaArrowLeftLong />
					Kembali
				</Button>
			</Link>
			<h1 className="text-center font-bold text-2xl border p-2 rounded-md">
				Order Bahan Baku
			</h1>
			<div className="flex gap-4 w-full mt-4">
				<Card className="w-full p-4 rounded-md h-fit">
					<h1 className="text-xl font-bold ">Bahan Baku</h1>
					<ItemBahanBaku
						data={data}
						cartBahanBaku={cartBahanBaku}
						removeFromCart={removeFromCart}
						addToCart={addToCart}
					/>
				</Card>
				<Card className="w-[45%] p-4 rounded-md">
					<h1 className="text-xl font-bold">Order List</h1>
					{cartBahanBaku.length > 0 ? (
						<ListItem
							data={cartBahanBaku}
							removeItemFromCart={removeItemFromCart}
						/>
					) : (
						<p className="text-center text-sm text-slate-500 mt-4 border-y py-4">
							Tidak ada item
						</p>
					)}
					<DetailTotal getCartTotal={getCartTotal} />
					<Button
						className="w-full mt-4 py-6 bg-blue-500"
						onClick={() => orderBahanBaku()}
						disabled={loading}
					>
						{loading ? "Loading..." : "Checkout"}
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default PageBahanBaku;
