"use client";

import React, { useEffect, useState, useMemo } from "react";
import BGPattern from "@/assets/pattern.svg";
import Judul from "@/components/common/Judul";
import { getAllMenu } from "@/services/api/menu";
import CardMenu from "./CardMenu";

const AllMenu = () => {
	const [menu, setMenu] = useState([]);

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

	const { filteredMakanan, filteredMinuman } = useMemo(() => {
		const filteredMakanan = [];
		const filteredMinuman = [];
		menu.forEach((item) => {
			if (item.kategori === "makanan") {
				filteredMakanan.push(item);
			} else if (item.kategori === "minuman") {
				filteredMinuman.push(item);
			}
		});
		return { filteredMakanan, filteredMinuman };
	}, [menu]);

	return (
		<section
			className="md:w-full min-h-screen bg-[#FFE920]"
			id="menu"
			style={{
				backgroundImage: `url(${BGPattern.src})`,
				backgroundRepeat: "repeat",
				backgroundSize: "auto",
			}}
		>
			<div className="md:max-w-screen-xl mx-auto py-28">
				<Judul
					mainText="D'EMIEHAN"
					subText="Menu"
					mainTextColor="text-[#FFE920]"
					className="text-4xl md:text-7xl"
				/>
				{menu.length === 0 ? (
					<p className="flex justify-center items-center min-h-lvh text-2xl font-bold">
						No menu items available
					</p>
				) : (
					<>
						<CardMenu filterMenu={filteredMakanan} judul="Makanan" />
						<CardMenu filterMenu={filteredMinuman} judul="Minuman" />
					</>
				)}
			</div>
		</section>
	);
};

export default AllMenu;
