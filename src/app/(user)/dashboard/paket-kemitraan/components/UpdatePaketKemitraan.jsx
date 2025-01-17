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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	jenis_kemitraan: z.string().nonempty("Jenis kemitraan harus diisi."),
	ukuran: z.string().nonempty("Ukuran harus diisi."),
	deskripsi: z.string().nonempty("Deskripsi harus diisi."),
	gambar: z
		.array(
			z
				.any()
				.refine(
					(file) => !file || file.size <= MAX_FILE_SIZE_10MB,
					`Batas ukuran gambar adalah 10MB.`
				)
				.refine(
					(file) => !file || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
					"Only .jpg, .jpeg, and .png formats are supported."
				)
		)
		.optional(),
	harga: z
		.number({
			required_error: "Harga harus diisi",
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

const UpdatePaketKemitraan = ({ fetchData, id, rowData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			jenis_kemitraan: rowData.jenis_kemitraan,
			ukuran: rowData.ukuran,
			deskripsi: rowData.deskripsi,
			gambar: undefined,
			harga: rowData.harga,
		},
	});

	const handleUpdate = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("jenis_kemitraan", data.jenis_kemitraan);
			formData.append("ukuran", data.ukuran);
			formData.append("harga", data.harga);
			formData.append("deskripsi", data.deskripsi);

			if (data.gambar) {
				data.gambar.forEach((file) => {
					formData.append("gambar", file);
				});
			}
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan/${id}`,
				{
					method: "PUT",
					body: formData,
				}
			);

			if (response.status === 200) {
				toast.success("Paket kemitraan berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error adding paket kemitraan:", error);
			toast.error("Gagal menambahkan paket kemitraan");
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
					<DialogTitle>Update Paket Kemitraan</DialogTitle>
					<DialogDescription>Update paket kemitraan baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdate)}
						className="space-y-4"
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

export default UpdatePaketKemitraan;
