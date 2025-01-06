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

function extractTextFromHTML(html) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	return doc.body.textContent?.trim() || "";
}

const FormSchema = z.object({
	judul: z.string().nonempty("Judul harus diisi."),
	gambar: z.any(),
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
	const [deskripsi, setDeskripsi] = useState("");

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
			if (data.gambar && data.gambar[0]) {
				formData.append("gambar", data.gambar[0]);
			}
			formData.append("isi", data.isi);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/berita`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.status === 201) {
				toast.success("Berita berhasil ditambahkan");
				form.reset(); // Reset form
				setDeskripsi(""); // Reset deskripsi
				router.push("/dashboard/berita"); // Redirect to berita page
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
				<CardTitle>Tambah Berita</CardTitle>
				<CardDescription>
					Tambah berita baru untuk ditampilkan di halaman berita.
				</CardDescription>
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
