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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	ACCEPTED_IMAGE_MIME_TYPES,
	MAX_FILE_SIZE_10MB,
} from "@/constant/constantData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	judul: z.string().nonempty("Judul harus diisi."),
	deskripsi: z.string().nonempty("Deskripsi harus diisi."),
	gambar: z
		.array(
			z
				.custom((file) => !!file, "Gambar harus diunggah.")
				.refine(
					(file) => file.size <= MAX_FILE_SIZE_10MB,
					`Batas ukuran gambar adalah 10MB.`
				)
				.refine(
					(file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
					"Only .jpg, .jpeg, and .png formats are supported."
				)
		)
		.nonempty("Minimal satu gambar harus diunggah."),
});

const TambahGaleri = ({ fetchData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			judul: "",
			deskripsi: "",
			gambar: null,
		},
	});

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("judul", data.judul);
			formData.append("deskripsi", data.deskripsi);
			data.gambar.forEach((file) => {
				formData.append("gambar", file);
			});

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/galeri`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.status === 201) {
				toast.success("Galeri berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error adding galeri:", error);
			toast.error("Gagal menambahkan galeri");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle />
					Tambah Galeri
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Galeri</DialogTitle>
					<DialogDescription>Tambahkan galeri baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
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
											multiple
											onChange={(e) => {
												field.onChange(Array.from(e.target.files));
											}}
										/>
									</FormControl>
									<FormDescription>
										Input beberapa gambar jika ingin lebih dari satu
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="w-full mt-2" disabled={loading}>
								{loading ? "Loading..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default TambahGaleri;
