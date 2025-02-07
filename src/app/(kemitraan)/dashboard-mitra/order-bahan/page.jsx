"use client";

import * as React from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import TableView from "@/components/dashboard/table-view";
import Link from "next/link";
import Cookies from "js-cookie";
import DetailOrder from "./components/DetailOrder";

const PageOrderBahan = () => {
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
						<ArrowUpDown />
						Status
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("status")
						? row.getValue("status")
						: "Tidak ada kategori"}
				</div>
			),
		},
		{
			accessorKey: "Nama",
			header: "Nama",
			cell: ({ row }) => (
				<div className="capitalize">{row.original.user?.nama || "-"}</div>
			),
		},
		{
			accessorKey: "Order Bahan",
			header: "Order Bahan",
			cell: ({ row }) =>
				row.original.order_bahan_detail.map((item, index) => (
					<div className="capitalize" key={index}>
						{item.bahan_baku.nama_bahan} {item.jumlah}
					</div>
				)),
		},
		{
			accessorKey: "total_harga",
			header: () => <div className="">Total Harga</div>,
			cell: ({ row }) => {
				const harga = parseFloat(row.getValue("total_harga"));

				const formatted = new Intl.NumberFormat("id-ID", {
					style: "currency",
					currency: "IDR",
				}).format(harga);

				return <div className="font-medium">{formatted}</div>;
			},
		},
		{
			accessorKey: "feedback",
			header: "Feedback",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("feedback") || "-"}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<DetailOrder rowData={rowData} />
					</div>
				);
			},
		},
	];

	const fetchDataMenu = React.useCallback(async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/order-bahan/user`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get("auth_session")}`,
				},
			}
		);
		setData(response.data.data);
	}, []);

	React.useEffect(() => {
		fetchDataMenu();
	}, [fetchDataMenu]);

	return (
		<>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => (
					<Link href="/dashboard-mitra/order-bahan/bahan-baku">
						<Button className="bg-blue-500">
							<PlusCircle />
							Order Bahan Baku
						</Button>
					</Link>
				)}
				title="Dashboard Order Bahan Baku"
				search="status"
			/>
		</>
	);
};

export default PageOrderBahan;
