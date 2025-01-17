"use client";

import React from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ButtonWa = () => {
	const [data, setData] = React.useState({});

	const fetchData = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/beranda/1`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const result = await response.json();
			setData(result.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const infoMessage = `Hallo, Saya tertarik untuk mengetahui lebih lanjut mengenai peluang kemitraan D'Emiehan. Apakah bisa dibantu dengan informasi terkait syarat, sistem, dan cara pendaftarannya?`;

	const partnershipMessage = `1. Nama Lengkap :
2. Jenis Kelamin :
3. Alamat Domisili : 
4. No.Telepon/WhattsApp :
5. E-mail (Jika Ada) :
6. Jenis Kemitraan : (Booth/Kios Kecil)`;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon" className="shadow-sm">
					<Image src="/wa.ico" width={32} height={32} alt="wa" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit mr-4">
				<div className="flex flex-col gap-4">
					<Button variant="outline" asChild>
						<Link
							href={`https://wa.me/${data.nomor}?text=${encodeURIComponent(
								infoMessage
							)}`}
						>
							Hubungi Kami
						</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link
							href={`https://wa.me/${data.nomor}?text=${encodeURIComponent(
								partnershipMessage
							)}`}
						>
							Hubungi Untuk Kemitraan
						</Link>
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ButtonWa;
