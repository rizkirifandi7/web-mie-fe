/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Card } from "./ui/card";
import axios from "axios";
import {
	ACCEPTED_IMAGE_MIME_TYPES,
	MAX_FILE_SIZE_10MB,
} from "@/constant/constantData";

const FormSchema = z.object({
	nama: z.string().nonempty("Nama harus diisi."),
	testimoni: z.string().nonempty("Testimoni harus diisi."),
	foto: z
		.any()
		.optional()
		.refine(
			(file) => !file || file.size <= MAX_FILE_SIZE_10MB,
			`Batas ukuran gambar adalah 5MB.`
		)
		.refine(
			(file) => !file || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
			"Only .jpg, .jpeg, and .png formats are supported."
		),
});

const TestimoniForm = () => {
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: "",
			testimoni: "",
			foto: undefined,
		},
	});

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("nama", data.nama);
			formData.append("testimoni", data.testimoni);
			if (data.foto) {
				formData.append("foto", data.foto);
			}

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/testimoni`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 201) {
				toast.success("Testimoni berhasil ditambahkan");
				form.reset();
			}
		} catch (error) {
			console.error("Error adding testimoni:", error);
			toast.error("Gagal menambahkan testimoni");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="w-full p-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleTambah)}
					className="space-y-4"
					encType="multipart/form-data"
				>
					<FormField
						control={form.control}
						name="nama"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama Lengkap</FormLabel>
								<FormControl>
									<Input
										className="shadow-none"
										placeholder="Nama Lengkap"
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
						name="testimoni"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Testimoni</FormLabel>
								<FormControl>
									<Textarea
										className="shadow-none resize-none"
										placeholder="Testimoni"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="foto"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Foto Diri</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										onChange={(e) => {
											field.onChange(e.target.files?.[0]);
										}}
									/>
								</FormControl>
								<FormDescription>
									Isi foto diri anda. (opsional)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded-lg"
						disabled={loading}
					>
						{loading ? "Loading..." : "Submit"}
					</Button>
				</form>
			</Form>
		</Card>
	);
};

export default TestimoniForm;
