import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import RichTextEditor from "../components/RichTextEditor";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

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

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const FormSchema = z.object({
	judul: z.string().nonempty("Judul harus diisi."),
	gambar: z
		.custom((file) => !!file, "Gambar harus diunggah.")
		.refine(
			(file) => file.size <= MAX_FILE_SIZE,
			`Batas ukuran gambar adalah 5MB.`
		)
		.refine(
			(file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
			"Only .jpg, .jpeg, and .png formats are supported."
		),
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

const TextEditor = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			judul: "",
			gambar: null,
			isi: "",
		},
	});

	const handleSubmit = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("judul", data.judul);
			formData.append("gambar", data.gambar);
			formData.append("isi", data.isi);
			formData.append("tipe", data.tipe);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/berita`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.status === 201) {
				toast.success("Berita berhasil ditambahkan");
				form.reset();
				router.push("/dashboard/berita-artikel");
			}
		} catch (error) {
			console.error("Error adding berita:", error);
			toast.error("Gagal menambahkan berita.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Tambah Data Informasi</CardTitle>
				<CardDescription>Tambah Informasi baru.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
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

						<FormField
							control={form.control}
							name="gambar"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gambar</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											onChange={(e) => {
												field.onChange(e.target.files?.[0]);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isi"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Deskripsi</FormLabel>
									<FormControl>
										<RichTextEditor
											content={field.value}
											onChange={(value) => field.onChange(value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button className="w-fit" disabled={loading}>
							{loading ? "Loading..." : "Simpan"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default TextEditor;
