/* eslint-disable react/jsx-no-target-blank */
"use client";

import * as React from "react";
import axios from "axios";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import HapusPesanan from "./components/HapusPesanan";
import DetailPesanan from "./components/DetailPesanan";
import UpdatePesananStatus from "./components/UpdatePesananStatus";
import { MdOutlineFileDownload } from "react-icons/md";
import Invoice from "./components/Invoice";
import { BlobProvider } from "@react-pdf/renderer";
import { ArrowUpDown } from "lucide-react";
import TableView from "@/components/dashboard/table-view";
import { formatDateTime } from "@/lib/formatDate";
import Cookies from "js-cookie";
import Link from "next/link";
import { HiOutlineDocumentReport } from "react-icons/hi";

const PagePesanan = () => {
	const [dataUser, setDataUser] = React.useState([]);

	const fetchDataPesanan = React.useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan/user`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("auth_session")}`,
					},
				}
			);

			if (response.status === 200) {
				setDataUser(response.data.data.reverse());
			} else {
				toast.error("Failed to fetch data");
			}
		} catch (error) {
			toast.error("Error fetching data. Please try again.");
			console.error(error);
		}
	}, []);

	React.useEffect(() => {
		fetchDataPesanan();
	}, [fetchDataPesanan]);

	const columns = [
		{
			accessorKey: "nama_pelanggan",
			header: "Nama Pelanggan",
		},
		{
			accessorKey: "tipe_payment",
			header: "Payment",
		},
		{
			accessorKey: "mode",
			header: "Tipe Order",
		},
		{
			accessorKey: "item_pesanan",
			header: "Item Pesanan",
			cell: ({ row }) =>
				row.original.item_pesanan.map((item, index) => (
					<div key={index}>
						{item.menu.nama_menu} - {item.jumlah} pcs
					</div>
				)),
		},
		{
			accessorKey: "total",
			header: "Total",
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => <UpdatePesananStatus row={row} />,
		},
		{
			accessorKey: "order_time",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Tanggal
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({ row }) => (
				<div>{formatDateTime(row.getValue("order_time"))}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const { id, ...rowData } = row.original;
				return (
					<div className="flex items-center gap-2">
						<DetailPesanan rowData={rowData} id={id} />
						<HapusPesanan id={id} fetchDataPesanan={fetchDataPesanan} />
						<Button variant="outline" size="icon">
							<BlobProvider document={<Invoice rowData={rowData} id={id} />}>
								{({ url }) => (
									<a href={url} target="_blank">
										<MdOutlineFileDownload />
									</a>
								)}
							</BlobProvider>
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<TableView
			columns={columns}
			data={dataUser}
			fetchData={fetchDataPesanan}
			TambahComponent={() => (
				<Link href="/dashboard-order/pesanan/laporan-pesanan">
					<Button className="bg-blue-500">
						<HiOutlineDocumentReport />
						Unduh Laporan Pesanan
					</Button>
				</Link>
			)}
			title="Dashboard Pesanan"
			search="item_pesanan"
		/>
	);
};

export default PagePesanan;
