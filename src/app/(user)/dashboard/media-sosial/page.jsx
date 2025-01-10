"use client";

import TableView from "@/components/TableView";
import React, { useEffect } from "react";
import UpdateMedia from "./components/UpdateMedia";
import HapusMedia from "./components/HapusMedia";
import TambahMedia from "./components/TambahMedia";

const PageMediaSosial = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama",
			header: "Nama Aplikasi",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("nama")}</div>
			),
		},
		{
			accessorKey: "link",
			header: "Link Aplikasi",
			cell: ({ row }) => <div className="truncate w-[300px]">{row.getValue("link")}</div>,
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<UpdateMedia fetchData={fetchData} id={id} rowData={rowData} />
						<HapusMedia id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/media-sosial`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();
		setData(data.mediaSosial);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => <TambahMedia fetchData={fetchData} />}
				title="Dashboard Media Sosial"
				search="nama"
				pageSize={10}
			/>
		</div>
	);
};

export default PageMediaSosial;
