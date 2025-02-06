"use client";

import * as React from "react";
import axios from "axios";

import TableView from "@/components/dashboard/table-view";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const PageLaporanPenjualanMitra = () => {
	const [data, setData] = React.useState([]);

	const fetchData = React.useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/pesanan/information`
			);
			setData(response.data.data);
		} catch (err) {
			console.error(err.message);
		}
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const columns = React.useMemo(
		() => [
			{
				accessorKey: "nama_mitra",
				header: "Nama Mitra",
				cell: ({ row }) => (
					<div className="capitalize">{row.getValue("nama_mitra")}</div>
				),
			},
			{
				accessorKey: "jumlah_pesanan",
				header: "Jumlah Pesanan",
				cell: ({ row }) => (
					<div className="capitalize">{row.getValue("jumlah_pesanan")}</div>
				),
			},
			{
				accessorKey: "total_penjualan",
				header: () => <div className="">Total Penjualan</div>,
				cell: ({ row }) => {
					const harga = parseFloat(row.getValue("total_penjualan"));

					const formatted = new Intl.NumberFormat("id-ID", {
						style: "currency",
						currency: "IDR",
					}).format(harga);

					return <div className="font-medium">{formatted}</div>;
				},
			},
			{
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const id = row.original.id_mitra;
					return (
						<div className="flex items-center gap-2">
							<Link href={`/dashboard-superadmin/laporan-penjualan/${id}`}>
								<Button variant="outline">
									<Eye />
									Lihat Detail Penjualan
								</Button>
							</Link>
						</div>
					);
				},
			},
		],
		[fetchData]
	);

	return (
		<>
			<TableView
				columns={columns}
				data={data}
				// TambahComponent={() => <TambahBahanBaku fetchData={fetchData} />}
				title="Dashboard Laporan Penjualan Mitra"
				search="nama_mitra"
				pageSize={5}
			/>
		</>
	);
};

export default PageLaporanPenjualanMitra;
