"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react"; // Tambahkan useState untuk mengontrol dialog

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createMenu } from "@/services/api/menu";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
	nama: z.string().min(2, {
		message: "nama must be at least 2 characters.",
	}),
	harga: z.string().min(1, {
		message: "harga must be at least 1 characters.",
	}),
	deskripsi: z.string().min(2, {
		message: "deskripsi must be at least 2 characters.",
	}),
	gambar: z.any(),
	kategori: z.string().min(2, {
		message: "kategori must be at least 2 characters",
	}),
});

export function TambahData({ fetchData }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: "",
			harga: "",
			deskripsi: "",
			gambar: "",
			kategori: "",
		},
	});

	async function onSubmit(data) {
		const formData = new FormData();

		console.log("data : ", data.kategori);
		formData.append("nama", data.nama);
		formData.append("harga", data.harga);
		formData.append("deskripsi", data.deskripsi);
		formData.append("kategori", data.kategori);
		formData.append("gambar", data.gambar[0]);

		try {
			await createMenu(formData);
			toast.success("Menu berhasil ditambahkan");
			form.reset();
			setIsOpen(false);
			fetchData();
		} catch (error) {
			console.error(error);
			toast.error("Gagal menambahkan menu");
		}
	}

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button className="inline-flex gap-1" onClick={() => setIsOpen(true)}>
						<Plus />
						<span>Tambah Menu</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Tambah Menu</DialogTitle>
						<DialogDescription>Masukkan data menu baru.</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
							<FormField
								control={form.control}
								name="nama"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama</FormLabel>
										<FormControl>
											<Input placeholder="Masukan nama menu..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="harga"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Harga</FormLabel>
										<FormControl>
											<Input type="number" placeholder="10000" {...field} />
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
											<Input
												placeholder="Masukan deskripsi menu..."
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
									onChange={(e) => form.setValue("gambar", e.target.files)}
								/>
							</div>
							<FormField
								control={form.control}
								name="kategori"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Kategori</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Kategori" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="makanan">Makanan</SelectItem>
													<SelectItem value="minuman">Minuman</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="w-full">
								<Button type="submit" className="w-full">
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
}
