"use client";

import * as React from "react";
import axios from "axios";

import TableView from "@/components/dashboard/table-view";
import UpdateBahanBaku from "./components/UpdatePesananBahanBaku";
import HapusBahanBaku from "./components/HapusPesananBahanBaku";
import DetailPesananBahanBaku from "./components/DetailPesananBahanBaku";

const PagePesananBahanBaku = () => {
	const [data, setData] = React.useState([]);

	const fetchData = React.useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/order-bahan`
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
				accessorKey: "status",
				header: "Status",
				cell: ({ row }) => (
					<div className="capitalize">{row.getValue("status")}</div>
				),
			},
			{
				accessorKey: "nama",
				header: "Nama Mitra",
				cell: ({ row }) => (
					<div className="capitalize">{row.original.user.nama}</div>
				),
			},
			{
				accessorKey: "Order Bahan",
				header: "Order Bahan",
				cell: ({ row }) =>
					row.original.order_bahan_detail.map((item, index) => (
						<div key={index}>
							{item.bahan_baku.nama_bahan}
							{`(${item.bahan_baku.jumlah})`} - x{item.jumlah}
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
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const id = row.original.id;
					const rowData = row.original;
					return (
						<div className="flex items-center gap-2">
							<DetailPesananBahanBaku rowData={rowData} />
							<UpdateBahanBaku
								fetchData={fetchData}
								id={id}
								rowData={rowData}
							/>
							<HapusBahanBaku id={id} fetchData={fetchData} />
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
				title="Dashboard Pesanan Bahan Baku"
				search="status"
				pageSize={5}
			/>
		</>
	);
};

export default PagePesananBahanBaku;
