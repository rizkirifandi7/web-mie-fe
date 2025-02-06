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
import RichTextEditor from "../../../../../components/RichTextEditor";

const FormSchema = z.object({
	jenis_kemitraan: z.string().nonempty("Jenis kemitraan harus diisi."),
	ukuran: z.string().nonempty("Ukuran harus diisi."),
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
	harga: z
		.number({
			required_error: "Harga harus diisi",
			invalid_type_error: "Harga harus berupa angka",
		})
		.min(0, { message: "Harga tidak boleh kurang dari 0" })
		.or(
			z
				.string()
				.nonempty("Harga harus diisi")
				.regex(/^\d+$/, "Harga harus berupa angka")
				.transform(Number)
		),
});

const TambahPaketKemitraan = ({ fetchData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			jenis_kemitraan: "",
			deskripsi: "",
			ukuran: "",
			gambar: null,
			harga: "",
		},
	});

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("jenis_kemitraan", data.jenis_kemitraan);
			formData.append("ukuran", data.ukuran);
			formData.append("harga", data.harga);
			formData.append("deskripsi", data.deskripsi);

			data.gambar.forEach((file) => {
				formData.append("gambar", file);
			});

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.status === 201) {
				toast.success("Paket kemitraan berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchData();
			} else {
				const resJson = await response.json();
				toast.error(`Gagal menambahkan: ${resJson.message}`);
			}
		} catch (error) {
			console.error("Error adding paket kemitraan:", error);
			toast.error("Gagal menambahkan paket kemitraan");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle />
					Tambah Paket Kemitraan
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[625px] mx-auto">
				<DialogHeader>
					<DialogTitle>Tambah Paket Kemitraan</DialogTitle>
					<DialogDescription>Tambahkan paket kemitraan baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4 max-w-[600px] w-full mx-auto"
					>
						<FormField
							control={form.control}
							name="jenis_kemitraan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis Kemitraan</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan jenis kemitraan..."
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
									<FormLabel>Deskripsi Paket</FormLabel>
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
						<FormField
							control={form.control}
							name="ukuran"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ukuran</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan ukuran..."
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
							name="harga"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Harga</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan harga..."
											{...field}
											type="number"
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

export default TambahPaketKemitraan;
