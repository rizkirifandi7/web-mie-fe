/* eslint-disable react/prop-types */
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Card } from "./ui/card";
import axios from "axios";

const FormSchema = z.object({
	nama: z.string().nonempty("Nama harus diisi."),
	testimoni: z.string().nonempty("Testimoni harus diisi."),
	foto: z.any(),
});

const TestimoniForm = () => {
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: "",
			testimoni: "",
			foto: "",
		},
	});

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("nama", data.nama);
			formData.append("testimoni", data.testimoni);
			if (data.foto && data.foto.length > 0) {
				formData.append("foto", data.foto[0]);
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
								<FormLabel>Nama</FormLabel>
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
					<div className="space-y-2">
						<FormLabel>Foto</FormLabel>
						<Input
							type="file"
							className="shadow-none h-full py-1.5"
							onChange={(e) => form.setValue("foto", e.target.files)}
						/>
					</div>
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
