"use client";

import * as React from "react";
import axios from "axios";

import TableView from "@/components/dashboard/table-view";
import UpdateBahanBaku from "./components/UpdateBahanBaku";
import HapusBahanBaku from "./components/HapusBahanBaku";
import TambahBahanBaku from "./components/TambahBahanBaku";

const PageBahanBaku = () => {
	const [data, setData] = React.useState([]);

	const fetchData = React.useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/bahan-baku`
			);
			setData(response.data.data);
		} catch (err) {
			console.error(err.message);
		}
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const columns = [
		{
			accessorKey: "nama_bahan",
			header: "Nama Bahan",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("nama_bahan")}</div>
			),
		},
		{
			accessorKey: "jumlah",
			header: "Jumlah",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("jumlah")}</div>
			),
		},
		{
			accessorKey: "harga",
			header: () => <div className="">Harga</div>,
			cell: ({ row }) => {
				const harga = parseFloat(row.getValue("harga"));

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
						<UpdateBahanBaku fetchData={fetchData} id={id} rowData={rowData} />
						<HapusBahanBaku id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	return (
		<>
			<TableView
				columns={columns}
				data={data}
				TambahComponent={() => <TambahBahanBaku fetchData={fetchData} />}
				title="Dashboard Bahan Baku"
				search="nama_bahan"
				pageSize={5}
			/>
		</>
	);
};

export default PageBahanBaku;
