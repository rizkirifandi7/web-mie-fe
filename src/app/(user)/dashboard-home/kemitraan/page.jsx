"use client";
import TableView from "@/components/TableView";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import React from "react";
import HapusKemitraan from "./components/DeleteKemitraan";
import DetailKemitraan from "./[id]/page";
import Link from "next/link";

const PageKemitraan = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "nama_lengkap",
			header: "Nama",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("nama_lengkap")}</div>
			),
		},
		{
			accessorKey: "no_telepon",
			header: "No Telepon",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("no_telepon")}</div>
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
			accessorKey: "tempat_tanggal_lahir",
			header: "Tempat Tanggal Lahir",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("tempat_tanggal_lahir")}</div>
			),
		},
		{
			accessorKey: "alamat_domisili",
			header: "Alamat Domisili",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("alamat_domisili")}</div>
			),
		},
		{
			accessorKey: "jenis_kemitraan",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Jenis Kemitraan
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize text-center">{row.getValue("jenis_kemitraan")}</div>
			),
		},
		{
			accessorKey: "lokasi_usaha",
			header: "Lokasi Usaha",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("lokasi_usaha")}</div>
			),
		},
		{
			accessorKey: "apakah_lokasi_usaha_tersedia",
			header: "Apakah Lokasi Usaha Tersedia",
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("apakah_lokasi_usaha_tersedia")}
				</div>
			),
		},
		{
			accessorKey: "pengalaman_bisnis",
			header: "Pengalaman Bisnis",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("pengalaman_bisnis")}</div>
			),
		},
		{
			accessorKey: "modal",
			header: "Modal",
			cell: ({ row }) => {
				const harga = parseFloat(row.getValue("modal"));
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
				return (
					<div className="flex items-center gap-2">
						<Button variant="outline" asChild>
							<a href={`/dashboard/kemitraan/${id}`}><Eye /></a>
						</Button>
						<HapusKemitraan id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/kemitraan`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setData(data);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<React.Fragment>
			<TableView
				columns={columns}
				data={data}
				title="Dashboard Kemitraan"
				search="nama_lengkap"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageKemitraan;
