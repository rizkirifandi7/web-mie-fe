"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";
import * as XLSX from "xlsx";

// Form schema
const FormSchema = z.object({
	startDate: z.date({
		required_error: "Start date is required.",
	}),
	endDate: z.date({
		required_error: "End date is required.",
	}),
});

const PageLaporanPesanan = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Form handler
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			startDate: undefined,
			endDate: undefined,
		},
	});

	// Fetch list pesanan
	useEffect(() => {
		const fetchListPesanan = async () => {
			if (!process.env.NEXT_PUBLIC_API_URL) {
				console.error("API URL is not set in the environment variables.");
				return;
			}

			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/pesanan/user`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("auth_session")}`,
						},
					}
				);
				setData(response.data.data);
			} catch (error) {
				console.error("Error fetching list pesanan:", error);
			}
		};

		fetchListPesanan();
	}, []);

	const filterDataByDate = (startDate, endDate) => {
		const filteredData = data.filter((item) => {
			const orderDate = new Date(item.order_time);
			return (
				item.status === "completed" &&
				(!startDate || orderDate >= new Date(startDate)) &&
				(!endDate || orderDate <= new Date(endDate))
			);
		});

		const aggregatedData = [];

		filteredData.forEach((item) => {
			// Gabungkan menu dan jumlahnya dalam format "Menu (xJumlah)"
			const pesananFormatted = item.item_pesanan
				.map((pesanan) => `${pesanan.menu.nama_menu} (x${pesanan.jumlah})`)
				.join(", ");

			aggregatedData.push({
				Tanggal: new Date(item.order_time).toLocaleDateString("id-ID"),
				"Nama Pelanggan": item.nama_pelanggan,
				"Tipe Pembayaran": item.tipe_payment,
				Pesanan: pesananFormatted,
				Mode: item.mode,
				Status: item.status,
				Total: parseFloat(item.total),
				"Harga Total Pesanan": item.item_pesanan.reduce(
					(sum, pesanan) => sum + pesanan.subtotal,
					0
				),
			});
		});

		return aggregatedData;
	};

	const exportJsonToExcel = (startDate, endDate) => {
		const extractedData = filterDataByDate(startDate, endDate);
		if (extractedData.length === 0) {
			toast.error("Tidak ada data untuk tanggal yang dipilih.");
			return;
		}

		const excelHeader = [
			"Tanggal",
			"Nama Pelanggan",
			"Tipe Pembayaran",
			"Pesanan",
			"Mode",
			"Status",
			"Total",
			"Harga Total Pesanan",
		];

		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(extractedData);

		// Tambahkan header
		XLSX.utils.sheet_add_aoa(worksheet, [excelHeader], { origin: "A1" });

		// Atur lebar kolom
		worksheet["!cols"] = excelHeader.map((header) => ({
			wch: header.length + 10,
		}));

		// Hitung total penjualan
		const totalPenjualan = extractedData.reduce(
			(sum, row) => sum + row["Harga Total Pesanan"],
			0
		);

		// Tambahkan baris total
		XLSX.utils.sheet_add_aoa(
			worksheet,
			[["", "", "", "", "", "", "Total Penjualan", totalPenjualan]],
			{ origin: `A${extractedData.length + 2}` }
		);

		// Tambahkan worksheet ke workbook
		XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Penjualan");

		// Simpan file
		XLSX.writeFile(workbook, "laporan-penjualan.xlsx");
	};

	const onSubmit = async (formData) => {
		setIsLoading(true);
		try {
			const { startDate, endDate } = formData;

			if (startDate > endDate) {
				toast.error("Start date cannot be after end date.");
				return;
			}

			exportJsonToExcel(startDate, endDate);
		} catch (error) {
			toast.error("Error exporting data to Excel. Please try again.");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Link href="/dashboard-order/pesanan">
				<Button variant="ghost" className="mb-4">
					<FaArrowLeftLong />
					Kembali
				</Button>
			</Link>

			<div className="flex flex-col justify-center items-center gap-4 w-full">
				<Card className="w-full md:w-[450px] rounded-md">
					<CardHeader>
						<CardTitle>Unduh Laporan Penjualan</CardTitle>
						<CardDescription>
							Silahkan memilih tanggal untuk melakukan unduh laporan pesanan.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Start Date */}
								<FormField
									control={form.control}
									name="startDate"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Tanggal Awal</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															className="w-full pl-3 text-left font-normal"
														>
															{field.value
																? format(field.value, "P")
																: "Pilih tanggal awal"}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) => date > new Date()}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="endDate"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Tanggal Akhir</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															className="w-full pl-3 text-left font-normal"
														>
															{field.value
																? format(field.value, "P")
																: "Pilih tanggal akhir"}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) => date > new Date()}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" disabled={isLoading} className="w-full">
									{isLoading ? "Processing..." : "Unduh Laporan Pesanan"}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default PageLaporanPesanan;
