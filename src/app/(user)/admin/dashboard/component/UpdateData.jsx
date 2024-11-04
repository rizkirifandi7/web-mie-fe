"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { updateMenu } from "@/services/api/menu";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
	nama: z.string().min(2, {
		message: "nama must be at least 2 characters.",
	}),
	harga: z.any(),
	deskripsi: z.string().min(2, {
		message: "deskripsi must be at least 2 characters.",
	}),
	gambar: z.any(),
	kategori: z.string().min(2, {
		message: "kategori must be at least 2 characters",
	}),
});

export function UpdateData({ menuId, rowData, fetchData }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: rowData.nama,
			harga: rowData.harga,
			deskripsi: rowData.deskripsi,
			gambar: rowData.gambar,
			kategori: rowData.kategori,
		},
	});

	async function onSubmit(data) {
		const formData = new FormData();
		formData.append("nama", data.nama);
		formData.append("harga", Number(data.harga));
		formData.append("deskripsi", data.deskripsi);
		formData.append("kategori", data.kategori);
		if (data.gambar[0]) {
			formData.append("gambar", data.gambar[0]);
		}

		try {
			await updateMenu(menuId, formData);
			toast.success("Menu berhasil diupdate");
			setIsOpen(false);
			fetchData();
		} catch (error) {
			console.error(error);
			toast("Terjadi kesalahan");
		}
	}

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button className="p-2" onClick={() => setIsOpen(true)}>
						<Pencil />
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
								<Label>Gambar</Label>
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
							<Button type="submit" className="w-full">
								Submit
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
}
