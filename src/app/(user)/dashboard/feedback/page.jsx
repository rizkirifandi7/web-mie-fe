"use client";

import TableView from "@/components/TableView";
import React, { useEffect } from "react";
import HapusFeedback from "./components/HapusFeedback";

const PageFeedback = () => {
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
			accessorKey: "nomor_telepon",
			header: "No.Telepon",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("nomor_telepon")}</div>
			),
		},
		{
			accessorKey: "kritik",
			header: "Kritik",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("kritik")}</div>
			),
		},
		{
			accessorKey: "saran",
			header: "Saran",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("saran")}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				return (
					<div className="flex items-center gap-2">
						<HapusFeedback id={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setData(data.feedback);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<TableView
				columns={columns}
				data={data}
				title="Dashboard Feedback"
				search="nama"
				pageSize={5}
			/>
		</div>
	);
};

export default PageFeedback;
