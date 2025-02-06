"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Soup } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FilterMenu from "./components/FilterMenu";
import OrderItem from "./components/OrderItem";
import OrderPaymentMethod from "./components/OrderPaymentMethod";
import OrderSummary from "./components/OrderSummary";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { generateCodePayment } from "@/lib/generateId";
import { toast } from "sonner";
import Cookies from "js-cookie";
import CardMenu from "./components/CardMenu";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";

const PageOrderMenu = () => {
	const [dataMenus, setDataMenus] = useState([]);
	const [dataFilterMenu, setDataFilterMenu] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { addToCart, cart, removeFromCart, getTotalPrice, setCart } = useCart();
	const [tipePayment, setTipePayment] = useState("Cash");
	const [note, setNote] = useState("");
	const [name, setName] = useState("");
	const [typeOrder, setTypeOrder] = useState("");

	const totalQuantity = useMemo(
		() => cart.reduce((acc, item) => acc + item.quantity, 0),
		[cart]
	);

	const fetchMenuData = useCallback(async () => {
		try {
			const [menuResponse, kategoriResponse] = await Promise.all([
				axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/user`, {
					headers: {
						Authorization: `Bearer ${Cookies.get("auth_session")}`,
					},
				}),
				axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kategori/user`, {
					headers: {
						Authorization: `Bearer ${Cookies.get("auth_session")}`,
					},
				}),
			]);

			setDataMenus(menuResponse.data.data);
			setDataFilterMenu(kategoriResponse.data.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, []);

	useEffect(() => {
		fetchMenuData();
	}, [fetchMenuData]);

	const handlePayment = useCallback(async () => {
		if (!name || !typeOrder || !tipePayment) {
			toast.error("Isi semua field");
			return;
		}

		const payload = {
			tipe_payment: tipePayment,
			mode: typeOrder,
			total: getTotalPrice(),
			items: cart.map((item) => ({
				id_menu: item.id,
				quantity: item.quantity,
				harga: item.harga,
				nama: item.nama_menu,
			})),
			code_payment: generateCodePayment(),
			nama_pelanggan: name,
			status: "preparing",
			catatan: note || "-",
		};

		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("auth_session")}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (data) {
				setName("");
				setCart([]);
				setNote("");
				setTypeOrder("");
				toast.success("Pesanan berhasil dibuat");
			}
		} catch (error) {
			console.error("Error placing order:", error);
			toast.error("Gagal membuat pesanan");
		}
	}, [tipePayment, typeOrder, cart, name, note, getTotalPrice, setCart]);

	const handlePlaceOrder = async () => {
		setIsLoading(true);
		await handlePayment();
		setIsLoading(false);
	};

	const filteredMenus = useMemo(
		() =>
			selectedCategory
				? dataMenus.filter(
						(menu) => menu.kategori === selectedCategory.nama_kategori
				  )
				: dataMenus,
		[selectedCategory, dataMenus]
	);

	return (
		<section>
			<h1 className="text-2xl font-bold border w-full rounded-md p-2 text-center mb-4">
				Order Menu
			</h1>
			<div className="flex flex-col md:flex-row gap-4">
				{/* Menu Section */}
				<Card className="flex flex-col gap-4 w-full rounded-md p-4">
					<h1 className="text-2xl font-semibold">
						{selectedCategory ? selectedCategory.nama_kategori : "Semua Menu"}
					</h1>

					<div className="flex items-center flex-wrap gap-4">
						{dataFilterMenu.map((data) => (
							<FilterMenu
								key={data.id}
								namafilter={data.nama_kategori}
								active={selectedCategory?.id === data.id}
								onClick={() => setSelectedCategory(data)}
							/>
						))}
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4">
						{filteredMenus.map((data) => {
							const cartItem = cart.find((item) => item.id === data.id);
							return (
								<CardMenu
									key={data.id}
									data={data}
									cartItem={cartItem}
									addToCart={addToCart}
									removeFromCart={removeFromCart}
								/>
							);
						})}
					</div>
					{filteredMenus.length === 0 && (
						<div className="flex flex-col h-[500px] justify-center items-center w-full">
							<Soup size={40} />
							<h1 className="text-center text-2xl font-semibold">
								Tidak ada menu
							</h1>
						</div>
					)}
				</Card>

				{/* Order Section */}
				<Card className="flex flex-col w-full md:w-[45%] border rounded-md h-full">
					<div className="border-b p-4 space-y-2">
						<h1 className="text-base font-semibold">Customer Info</h1>
						<div className="flex gap-2">
							<div className="w-full">
								<Label className="text-sm">Nama</Label>
								<Input
									type="text"
									placeholder="Nama"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="w-full">
								<Label className="text-sm">Tipe Order</Label>
								<Select value={typeOrder} onValueChange={setTypeOrder} required>
									<SelectTrigger>
										<SelectValue placeholder="Tipe Order" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Dine In">Dine in</SelectItem>
										<SelectItem value="Take Away">Take Away</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<Textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							className="w-full h-[80px] resize-none"
							placeholder="Catatan..."
						/>
					</div>

					<OrderItem cart={cart} totalQuantity={totalQuantity} />

					<OrderPaymentMethod
						tipePayment={tipePayment}
						handlePaymentChange={setTipePayment}
					/>

					<OrderSummary totalPrice={getTotalPrice} tax={0} discount={0} />

					<div className="p-4">
						<Button
							className="w-full py-6 rounded-lg bg-blue-500 text-white hover:bg-slate-800"
							onClick={handlePlaceOrder}
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Place Order"}
						</Button>
					</div>
				</Card>
			</div>
		</section>
	);
};

export default PageOrderMenu;
