"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { TambahData } from "./TambahData";
import { getAllMenu } from "@/services/api/menu";
import { UpdateData } from "./UpdateData";
import { toast } from "sonner";
import Image from "next/image";
import DeleteData from "./DeleteData";

export function DashboardTable() {
	const [menuData, setMenuData] = useState([]);
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});

	const fetchData = useCallback(async () => {
		try {
			const data = await getAllMenu();
			setMenuData(data);
		} catch (error) {
			console.error("Error fetching menu data:", error);
			toast.error("Gagal mengambil data menu.");
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const columns = [
		{
			accessorKey: "nama",
			header: "Nama",
		},
		{
			accessorKey: "harga",
			header: "Harga",
			cell: ({ row }) => {
				const harga = row.original.harga;
				return (
					<>
						<p>Rp {Intl.NumberFormat("id-ID").format(harga)}</p>
					</>
				);
			},
		},
		{
			accessorKey: "deskripsi",
			header: "Deskripsi",
		},
		{
			accessorKey: "gambar",
			header: "Gambar",
			cell: ({ row }) => {
				const filename = row.original.gambar;
				const imageUrl = `http://localhost:8000/view/${filename}`;
				return (
					<>
						<Image
							src={imageUrl}
							alt={filename}
							width={100}
							height={100}
							className="rounded-md"
						/>
					</>
				);
			},
		},
		{
			accessorKey: "kategori",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Kategori
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				const rowData = row.original;
				return (
					<div className="flex flex-row gap-2">
						<UpdateData menuId={id} rowData={rowData} fetchData={fetchData} />
						<DeleteData menuId={id} fetchData={fetchData} />
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data: menuData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	});

	return (
		<div className="px-10">
			<h1 className="text-2xl font-bold mt-6">Dashboard</h1>
			<div className="flex flex-col md:flex-row md:items-center py-4 gap-4">
				<Input
					placeholder="Cari Menu..."
					value={table.getColumn("nama")?.getFilterValue() ?? ""}
					onChange={(event) =>
						table.getColumn("nama")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<TambahData fetchData={fetchData} />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto w-full md:w-fit">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DashboardTable;
