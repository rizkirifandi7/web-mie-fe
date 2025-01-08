"use client";
import TableView from "@/components/TableView";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import UpdateTestimoni from "./testimoni/UpdateTestimoni";
import HapusTestimoni from "./testimoni/HapusTestimoni";
import TambahTestimoni from "./testimoni/TambahTestimoni";

const PageTestimoni = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "status",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Status
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("status")}</div>
			),
		},
		{
			accessorKey: "nama",
			header: "Nama",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("nama")}</div>
			),
		},
		{
			accessorKey: "testimoni",
			header: "Testimoni",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("testimoni")}</div>
			),
		},

		{
			accessorKey: "foto",
			header: "Foto",
			cell: ({ row }) => (
				<div>
					<Image
						src={row.getValue("foto")}
						width={50}
						height={50}
						className="w-auto h-auto"
						alt="foto"
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
						<UpdateTestimoni fetchData={fetchData} id={id} rowData={rowData} />
						<HapusTestimoni id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/testimoni`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
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
				TambahComponent={() => <TambahTestimoni fetchData={fetchData} />}
				title="Dashboard Menu"
				search="nama"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageTestimoni;
