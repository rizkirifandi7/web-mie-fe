"use client";
import TableView from "@/components/TableView";
import Image from "next/image";
import React, { useEffect } from "react";
import TambahSertifikat from "./components/TambahSertifikat";
import UpdateSertifikat from "./components/UpdateSertifikat";
import HapusSertifikat from "./components/HapusSertifikat";

const PageSertifikat = () => {
	const [data, setData] = React.useState([]);

	const columns = [
		{
			accessorKey: "keterangan",
			header: "Keterangan",
			cell: ({ row }) => (
				<div className="capitalize truncate w-[300px]">{row.getValue("keterangan")}</div>
			),
		},
		{
			accessorKey: "gambar",
			header: "Gambar",
			cell: ({ row }) => (
				<div>
					<Image
						src={row.getValue("gambar")}
						width={70}
						height={70}
						alt="gambar"
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
						<UpdateSertifikat fetchData={fetchData} id={id} rowData={rowData} />
						<HapusSertifikat id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/sertifikat`,
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
				TambahComponent={() => <TambahSertifikat fetchData={fetchData} />}
				title="Dashboard Sertifikat"
				search="keterangan"
				pageSize={5}
			/>
		</React.Fragment>
	);
};

export default PageSertifikat;
