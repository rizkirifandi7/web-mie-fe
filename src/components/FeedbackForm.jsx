import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormSchema = z.object({
	nama: z.any(),
	nomor_telepon: z.any(),
	kritik: z.string().nonempty("Kritik harus diisi."),
	saran: z.string().nonempty("Kritik harus diisi."),
});

const FeedbackForm = () => {
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: "",
			kritik: "",
			saran: "",
			nomor_telepon: "",
		},
	});

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("nama", data.nama);
			formData.append("kritik", data.kritik);
			formData.append("saran", data.saran);
			formData.append("nomor_telepon", data.nomor_telepon);

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`,
				data
			);

			if (response.status === 201) {
				toast.success("Feedback berhasil ditambahkan");
				form.reset();
			}
		} catch (error) {
			console.error("Error adding feedback:", error);
			toast.error("Gagal menambahkan feedback");
		} finally {
			setLoading(false);
		}
	};
	return (
		<Card className="w-full p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleTambah)} className="space-y-4">
					<FormField
						control={form.control}
						name="nama"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama</FormLabel>
								<FormControl>
									<Input
										className="shadow-none"
										placeholder="Nama Lengkap (optional)"
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
						name="nomor_telepon"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nomor Telepon</FormLabel>
								<FormControl>
									<Input
										className="shadow-none"
										placeholder="Nomor Telepon (optional)"
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
						name="saran"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Saran</FormLabel>
								<FormControl>
									<Textarea
										className="shadow-none resize-none"
										placeholder="Saran"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="kritik"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Kritik</FormLabel>
								<FormControl>
									<Textarea
										className="shadow-none resize-none"
										placeholder="Kritik"
										{...field}
									/>
								</FormControl>
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

export default FeedbackForm;
