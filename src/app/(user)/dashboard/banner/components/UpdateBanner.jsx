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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE_20MB } from "@/constant/constantData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	judul: z.string().nonempty("Judul harus diisi."),
	gambar: z
		.any()
		.optional()
		.refine(
			(file) => !file || file.size <= MAX_FILE_SIZE_20MB,
			`Batas ukuran gambar adalah 10MB.`
		)
		.refine(
			(file) => !file || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
			"Only .jpg, .jpeg, and .png formats are supported."
		),
	deskripsi: z.string().nonempty("Deskripsi harus diisi."),
	link: z.string().nonempty("Link harus berupa URL yang valid."),
});

const UpdateBanner = ({ fetchData, id, rowData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			judul: rowData.judul,
			gambar: undefined,
			deskripsi: rowData.deskripsi,
			link: rowData.link,
		},
	});

	const handleUpdate = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("judul", data.judul);
			if (data.gambar) {
				formData.append("gambar", data.gambar);
			}
			formData.append("deskripsi", data.deskripsi);
			formData.append("link", data.link);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/banner/${id}`,
				{
					method: "PUT",
					body: formData,
				}
			);

			if (response.status === 200) {
				toast.success("Banner berhasil diupdate");
				form.reset();
				setOpenTambah(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error adding banner:", error);
			toast.error("Gagal menambahkan banner");
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
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Banner</DialogTitle>
					<DialogDescription>Update banner.</DialogDescription>
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
											className="shadow-none"
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
							name="link"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tujuan Halaman</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Tujuan Halaman" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="berita">Berita</SelectItem>
												<SelectItem value="tentang">Tentang</SelectItem>
												<SelectItem value="artikel">Artikel</SelectItem>
												<SelectItem value="galeri">Galeri</SelectItem>
												<SelectItem value="kemitraan">Kemitraan</SelectItem>
												<SelectItem value="registrasi">Registrasi</SelectItem>
												<SelectItem value="menu">Menu</SelectItem>
												<SelectItem value="feedback">Feedback</SelectItem>
												<SelectItem value="kontak">Kontak</SelectItem>
											</SelectContent>
										</Select>
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
											onChange={(e) => {
												field.onChange(e.target.files?.[0]);
											}}
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
								{isLoading ? "Loading..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateBanner;
