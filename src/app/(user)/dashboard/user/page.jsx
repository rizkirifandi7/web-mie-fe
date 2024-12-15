"use client";
import TableView from "@/components/TableView";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect } from "react";
import TambahUser from "./components/TambahUser";
import UpdateUser from "./components/UpdateUser";
import HapusUser from "./components/HapusUser";

const PageUser = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama",
			header: "Nama",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("nama")}</div>
			),
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("email")}</div>
			),
		},
		{
			accessorKey: "role",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Role
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("role")}</div>
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
						<UpdateUser fetchData={fetchData} id={id} rowData={rowData} />
						<HapusUser id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(`http://localhost:8000/akuns`, {
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
		<React.Fragment>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => <TambahUser />}
				title="Dashboard User"
				search="nama"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageUser;
