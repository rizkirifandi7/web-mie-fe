"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const FormSchema = z.object({
	judul: z.string().nonempty("Judul harus diisi."),
	deskripsi: z.string().nonempty("Deskripsi harus diisi."),
	gambar: z.any(),
	background: z.any(),
});

const BerandaDashboard = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			judul: "",
			deskripsi: "",
			gambar: "",
			background: "",
		},
	});

	const fetchData = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/beranda/1`
			);
			const result = await response.json();
			setData(result.data);
			form.reset({
				judul: result.data.judul,
				deskripsi: result.data.deskripsi,
				gambar: result.data.gambar ? result.data.gambar : "",
				background: result.data.background ? result.data.background : "",
			});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			console.log(data);
			const formData = new FormData();
			formData.append("judul", data.judul);
			formData.append("deskripsi", data.deskripsi);
			formData.append("gambar", data.gambar[0]);
			formData.append("background", data.background[0]);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/beranda/1`,
				{
					method: "PUT",
					body: formData,
				}
			);

			console.log(response);

			if (response.status === 200) {
				toast.success("Banner berhasil ditambahkan");
				form.reset();
				fetchData();
			}
		} catch (error) {
			console.error("Error adding banner:", error);
			toast.error("Gagal menambahkan banner");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleTambah)} className="space-y-4">
				<FormField
					control={form.control}
					name="judul"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Judul</FormLabel>
							<FormControl>
								<Input
									className="shadow-none"
									placeholder="masukkan judul..."
									{...field}
									type="text"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="deskripsi"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deskripsi</FormLabel>
							<FormControl>
								<Textarea
									className="shadow-none resize-none"
									placeholder="masukkan deskripsi..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="space-y-2">
					<Label className="">Gambar</Label>
					<Input
						type="file"
						className="shadow-none h-full py-1.5"
						onChange={(e) => form.setValue("gambar", e.target.files)}
					/>
					<div className="w-24 h-24 bg-gray-100 rounded-md">
						{data.gambar && (
							<Image
								src={data.gambar}
								width={150}
								height={150}
								alt="gambar"
								className="w-24 h-24 object-cover rounded-md"
							/>
						)}
					</div>
				</div>
				<div className="space-y-2">
					<Label className="">Background</Label>
					<Input
						type="file"
						className="shadow-none h-full py-1.5"
						onChange={(e) => form.setValue("background", e.target.files)}
					/>
					<div className="w-24 h-24 bg-gray-100 rounded-md">
						{data.background && (
							<Image
								src={data.background}
								width={150}
								height={150}
								alt="background"
								className="w-24 h-24 object-cover rounded-md"
							/>
						)}
					</div>
				</div>
				<Button type="submit" className="w-fit mt-2" disabled={loading}>
					{loading ? "Loading..." : "Update"}
				</Button>
			</form>
		</Form>
	);
};

export default BerandaDashboard;