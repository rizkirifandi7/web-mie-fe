"use client";

import TableView from "@/components/TableView";
import React, { useEffect } from "react";
import TambahCabang from "./components/TambahCabang";
import HapusCabang from "./components/HapusCabang";
import UpdateCabang from "./components/UpdateCabang";

const PageCabang = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama_cabang",
			header: "Nama Cabang",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("nama_cabang")}</div>
			),
		},
		{
			accessorKey: "alamat",
			header: "Alamat",
			cell: ({ row }) => (
				<div className="capitalize truncate w-[300px]">
					{row.getValue("alamat")}
				</div>
			),
		},
		{
			accessorKey: "link_gmap",
			header: "Link Maps",
			cell: ({ row }) => (
				<div className="truncate w-[300px]">{row.getValue("link_gmap")}</div>
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
						<UpdateCabang fetchData={fetchData} id={id} rowData={rowData} />
						<HapusCabang id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cabang`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setData(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => <TambahCabang fetchData={fetchData} />}
				title="Dashboard Cabang"
				search="nama_cabang"
				pageSize={5}
			/>
		</div>
	);
};

export default PageCabang;
