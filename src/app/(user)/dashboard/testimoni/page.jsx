"use client";
import TableView from "@/components/TableView";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import UpdateTestimoni from "./components/UpdateTestimoni";
import HapusTestimoni from "./components/HapusTestimoni";
import TambahTestimoni from "./components/TambahTestimoni";

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
			cell: ({ row }) => {
				const fotoUrl = row.getValue("foto");
				return (
					<div>
						{fotoUrl ? (
							<Image
								src={fotoUrl}
								width={70}
								height={70}
								alt="foto"
							/>
						) : (
							<div
								style={{
									width: "70px",
									height: "70px",
									backgroundColor: "#e0e0e0",
								}}
							/>
						)}
					</div>
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
				title="Dashboard Testimoni"
				search="nama"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageTestimoni;
