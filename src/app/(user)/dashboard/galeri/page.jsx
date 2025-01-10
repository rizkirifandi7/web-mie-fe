"use client";
import TableView from "@/components/TableView";
import Image from "next/image";
import React, { useEffect } from "react";
import UpdateGaleri from "./components/UpdateGaleri";
import HapusGaleri from "./components/HapusGaleri";
import TambahGaleri from "./components/TambahGaleri";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const PageGaleri = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "judul",
			header: "Judul",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("judul")}</div>
			),
		},
		{
			accessorKey: "deskripsi",
			header: "Deskripsi",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("deskripsi")}</div>
			),
		},
		{
			accessorKey: "gambar",
			header: "Gambar",
			cell: ({ row }) => {
				const gambarArray = row.getValue("gambar");
				return (
					<Carousel className="flex justify-center items-center w-20 h-20">
						<CarouselContent>
							{gambarArray.map((gambar, index) => (
								<CarouselItem key={index}>
									<Image
										src={gambar.path}
										width={50}
										height={50}
										className="w-auto h-auto"
										alt={`gambar-${index}`}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				);
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<UpdateGaleri fetchData={fetchData} id={id} rowData={rowData} />
						<HapusGaleri id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/galeri`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setData(data.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => <TambahGaleri fetchData={fetchData} />}
				title="Dashboard Galeri"
				search="judul"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageGaleri;
