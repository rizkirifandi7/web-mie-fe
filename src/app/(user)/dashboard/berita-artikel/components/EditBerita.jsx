/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import RichTextEditor from "./RichTextEditor";
import { Label } from "@/components/ui/label";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function extractTextFromHTML(html) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	return doc.body.textContent?.trim() || "";
}

const FormSchema = z.object({
	judul: z.string().nonempty("Judul harus diisi."),
	gambar: z.any(),
	tipe: z.string().nonempty("Tipe harus diisi."),
	isi: z.string().refine(
		(value) => {
			return extractTextFromHTML(value).trim().length >= 5;
		},
		{
			message: "Deskripsi harus diisi dan minimal 5 karakter.",
		}
	),
});

const EditBerita = ({ fetchData, id, rowData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			judul: rowData.judul,
			gambar: rowData.gambar,
			isi: rowData.isi,
			tipe: rowData.tipe,
		},
	});

	const handleUpdate = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("judul", data.judul);
			formData.append("gambar", data.gambar[0]);
			formData.append("isi", data.isi);
			formData.append("tipe", rowData.tipe);

			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/berita/${id}`,
				{
					judul: data.judul,
					gambar: data.gambar,
					isi: data.isi,
					tipe: data.tipe,
				}
			);

			if (response.status === 200) {
				toast.success("Berita berhasil diupdate");
				form.reset();
				setOpenTambah(false);
				fetchData();
			} else {
				toast.error("Gagal mengupdate berita");
			}
		} catch (error) {
			console.error("Error updating berita:", error);
			toast.error("Gagal mengupdate berita");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<MdOutlineEdit />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[650px]">
				<DialogHeader>
					<DialogTitle>Update Berita</DialogTitle>
					<DialogDescription>Update berita baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdate)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="judul"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Judul</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nama judul..."
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
							name="tipe"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis Informasi</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih tipe informasi berita atau artikel" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="berita">Berita</SelectItem>
											<SelectItem value="artikel">Artikel</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-1">
							<Label>Gambar</Label>
							<Input
								type="file"
								placeholder="gambar"
								onChange={(e) =>
									form.setValue("gambar", Array.from(e.target.files))
								}
							/>
						</div>

						<FormField
							control={form.control}
							name="isi"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Deskripsi</FormLabel>
									<FormControl>
										<RichTextEditor
											content={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type="submit"
								className="w-full mt-2"
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Update Berita"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditBerita;