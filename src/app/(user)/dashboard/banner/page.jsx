"use client";
import TableView from "@/components/TableView";
import Image from "next/image";
import React, { useEffect } from "react";
import UpdateBanner from "./components/UpdateBanner";
import HapusBanner from "./components/HapusBanner";
import TambahBanner from "./components/TambahBanner";

const PageBanner = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "judul",
			header: "Judul",
			cell: ({ row }) => (
				<div className="capitalize truncate w-[250px]">{row.getValue("judul")}</div>
			),
		},
		{
			accessorKey: "deskripsi",
			header: "Deskripsi",
			cell: ({ row }) => (
				<div className="capitalize truncate w-[400px]">{row.getValue("deskripsi")}</div>
			),
		},
		{
			accessorKey: "link",
			header: "Tujuan Halaman",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("link")}</div>
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
						className="w-auto h-auto"
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
						<UpdateBanner fetchData={fetchData} id={id} rowData={rowData} />
						<HapusBanner id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner`, {
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
				TambahComponent={() => <TambahBanner fetchData={fetchData} />}
				title="Dashboard Banner"
				search="judul"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageBanner;
