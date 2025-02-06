"use client";

import * as React from "react";
import axios from "axios";

import TambahUser from "./components/TambahUser";
import UpdateUser from "./components/UpdateUser";
import HapusUser from "./components/HapusUser";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowUpDown } from "lucide-react";
import TableView from "@/components/dashboard/table-view";

const PageUser = () => {
	const [dataUser, setDataUser] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama",
			header: "Nama",
			cell: ({ row }) => <div>{row.getValue("nama")}</div>,
		},
		{
			accessorKey: "email",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Email
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("email")}</div>
			),
		},
		{
			accessorKey: "role",
			header: "Role",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("role")}</div>
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
						<UpdateUser
							fetchDataUser={fetchDataUser}
							rowData={rowData}
							id={id}
						/>
						<HapusUser id={id} fetchDataUser={fetchDataUser} />
					</div>
				);
			},
		},
	];

	const fetchDataUser = React.useCallback(async () => {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);

		if (response.status !== 200) {
			toast.error("Error fetching data user");
			return;
		}

		const filterMitra = response.data.data.filter(
			(item) => item.role === "mitra"
		);

		setDataUser(filterMitra);
	}, []);

	React.useEffect(() => {
		fetchDataUser();
	}, [fetchDataUser]);

	return (
		<>
			<TableView
				columns={columns}
				data={dataUser}
				fetchData={fetchDataUser}
				TambahComponent={() => <TambahUser fetchDataUser={fetchDataUser} />}
				title="Dashboard Akun Mitra"
				search="nama"
			/>
		</>
	);
};

export default PageUser;
