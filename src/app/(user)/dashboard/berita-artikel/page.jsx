"use client";
import TableView from "@/components/TableView";
import Image from "next/image";
import React, { useEffect } from "react";
import TambahBerita from "./components/TambahBerita";
import parse from "html-react-parser";
import HapusBerita from "./components/HapusBerita";
import EditBerita from "./components/EditBerita";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const PageBerita = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "tipe",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Tipe
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("tipe")}</div>
			),
		},
		{
			accessorKey: "judul",
			header: "Judul",
			cell: ({ row }) => (
				<div className="capitalize w-[250px] truncate">{row.getValue("judul")}</div>
			),
		},
		{
			accessorKey: "isi",
			header: "Isi",
			cell: ({ row }) => (
				<div className="w-[350px] truncate h-[25px]">
					{parse(row.getValue("isi"))}
				</div>
			),
		},
	
		{
			accessorKey: "gambar",
			header: "Gambar",
			cell: ({ row }) => (
				<div>
					<Image
						src={row.getValue("gambar")}
						width={50}
						height={50}
						className="w-auto h-auto object-cover"
						alt="gambar"
					/>
				</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<EditBerita id={id} fetchData={fetchData} rowData={rowData} />
						<HapusBerita id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/berita`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setData(data.berita);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => <TambahBerita />}
				title="Dashboard Berita & Artikel"
				search="judul"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageBerita;
