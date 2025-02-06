"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button"; // Import komponen Button

const OrderCard = ({ item, onUpdate }) => (
	<Card key={item.id} className="max-w-xs w-full flex-shrink-0 h-fit">
		<div className="flex justify-between items-center p-4 border-b">
			<div>
				<h1 className="text-base font-semibold">{item.nama_pelanggan}</h1>
				<p className="text-sm">
					{new Date(item.order_time).toLocaleDateString("id-ID", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
					,{" "}
					{new Date(item.order_time).toLocaleTimeString("id-ID", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>
			<div className="text-end">
				<h1 className="text-base font-semibold">Order #{item.id}</h1>
				<p className="text-sm">{item.mode}</p>
			</div>
		</div>
		<div className="p-4">
			{item.item_pesanan.map((subItem) => (
				<div className="flex justify-between items-center" key={subItem.id}>
					<p className="text-sm">{subItem.menu.nama_menu}</p>
					<p className="text-sm">x{subItem.jumlah}</p>
				</div>
			))}
		</div>
		<div className="p-4">
			<h1 className="text-sm font-semibold">Catatan:</h1>
			<p className="text-sm">{item.catatan || "-"}</p>
		</div>
		{item.status === "preparing" && (
			<div className="flex gap-x-4 justify-between items-center p-4 border-t">
				<>
					<button
						className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
						onClick={() => onUpdate(item.id, "completed")}
					>
						Completed
					</button>
					<button
						className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
						onClick={() => onUpdate(item.id, "canceled")}
					>
						Cancel
					</button>
				</>
			</div>
		)}
	</Card>
);

const PageKitchenList = () => {
	const [orders, setOrders] = useState({
		preparing: [],
		completed: [],
		canceled: [],
	});
	const [loading, setLoading] = useState(false);

	const fetchOrders = useCallback(async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan/user`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("auth_session")}`,
					},
				}
			);
			if (response.status === 200) {
				const groupedOrders = response.data.data.reduce(
					(acc, order) => {
						acc[order.status]?.push(order);
						return acc;
					},
					{ preparing: [], completed: [], canceled: [] }
				);
				setOrders(groupedOrders);
			} else {
				toast.error("Failed to fetch data");
			}
		} catch (error) {
			toast.error("Failed to fetch data");
		} finally {
			setLoading(false);
		}
	}, []);

	const updateOrderStatus = async (id, status) => {
		try {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan/${id}`,
				{ status }
			);

			if (response.status === 200) {
				toast.success("Order status updated successfully");
				fetchOrders();
			} else {
				toast.error("Failed to update order status");
			}
		} catch (error) {
			toast.error("Failed to update order status");
		}
	};

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Kitchen List Pesanan</h1>
				<Button onClick={fetchOrders} disabled={loading} className="bg-blue-500">
					{loading ? "Refreshing..." : "Refresh"}
				</Button>
			</div>
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<div className="loader"></div>
				</div>
			) : (
				<>
					{["preparing", "completed", "canceled"].map((status) => (
						<div key={status} className="flex flex-col gap-4 mt-6">
							<h1 className="text-base font-semibold border p-2 rounded-md text-center">
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</h1>
							<div className="flex gap-4 w-full overflow-x-auto py-4">
								{orders[status]?.map((item) => (
									<OrderCard
										key={item.id}
										item={item}
										onUpdate={updateOrderStatus}
									/>
								))}
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default PageKitchenList;
