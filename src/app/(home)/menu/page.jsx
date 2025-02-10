"use client";

import React, { useEffect, useState } from "react";
import Judul from "@/components/Judul";
import { getAllMenu } from "@/services/api/menu";
import CardMenu from "./components/CardMenu";
import { Button } from "@/components/ui/button";
import BackgroundBox from "@/components/BackgroundBox";

const PageMenu = () => {
	const [menu, setMenu] = useState([]);
	const [filter, setFilter] = useState("semua menu");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllMenu();
				setMenu(data);
			} catch (error) {
				console.error("Error fetching menu data:", error);
			}
		};
		fetchData();
	}, []);

	const filterMenu = (type) => {
		setFilter(type);
	};

	const filteredMenu =
		filter === "semua menu"
			? menu
			: menu.filter((item) => item.kategori === filter);

	return (
		<section className="md:w-full min-h-screen " id="menu">
			<div className="md:max-w-screen-xl mx-auto py-28 px-8 md:px-0">
				<BackgroundBox>
					<Judul mainText="DEMIEHAN" subText="Produk Kami" />
				</BackgroundBox>

				<div className="flex flex-col md:flex-row justify-between items-start mt-10 gap-10">
					<div className="w-full md:basis-1/4 flex flex-col gap-y-4">
						<h1 className="text-2xl font-bold capitalize text-center md:text-start">
							{filter}
						</h1>
						{["semua menu", "makanan", "minuman", "topping"].map((type) => (
							<Button
								key={type}
								variant="outline"
								onClick={() => filterMenu(type)}
								className={`${
									filter === type ? "bg-blue-500 text-white" : "text-black"
								}`}
							>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</Button>
						))}
					</div>
					<div className="w-full">
						{filteredMenu.length === 0 ? (
							<p className="flex justify-center items-center h-[500px] text-xl text-slate-500 font-semibold">
								Tidak ada menu
							</p>
						) : (
							<div className="">
								<CardMenu filterMenu={filteredMenu} />
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageMenu;
