"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

const FormSchema = z.object({
	nama_lengkap: z.string().min(2, {
		message: "Nama lengkap harus diisi.",
	}),
	nik: z.string().min(16, {
		message: "NIK harus diisi.",
	}),
	jenis_kelamin: z.string().nonempty({
		message: "Jenis kelamin harus diisi.",
	}),
	status_pernikahan: z.string().nonempty({
		message: "status pernikahan harus diisi.",
	}),
	alamat_domisili: z.string().min(2, {
		message: "alamat domisili harus diisi.",
	}),
	no_telepon: z.string().min(10, {
		message: "no telepon harus diisi.",
	}),
	email: z.string().email({
		message: "email must be a valid email.",
	}),
	tempat_tanggal_lahir: z.string().min(2, {
		message: "tempat tanggal_lahir harus diisi.",
	}),
	jenis_kemitraan: z.string().nonempty({
		message: "jenis kemitraan harus diisi.",
	}),
	lokasi_usaha: z.string().min(2, {
		message: "lokasi usaha harus diisi.",
	}),
	apakah_lokasi_usaha_tersedia: z.string().nonempty({
		message: "apakah_lokasi_usaha_tersedia harus diisi.",
	}),
	pengalaman_bisnis: z.string().nonempty({
		message: "pengalaman bisnis harus diisi.",
	}),
	modal: z.string().nonempty({
		message: "modal harus diisi.",
	}),
	alasan: z.string().min(10, {
		message: "alasan harus diisi.",
	}),
});

const FormRegistrasi = () => {
	const [loading, setLoading] = useState(false);
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_lengkap: "",
			nik: "",
			jenis_kelamin: "",
			status_pernikahan: "",
			alamat_domisili: "",
			no_telepon: "",
			email: "",
			tempat_tanggal_lahir: "",
			jenis_kemitraan: "",
			lokasi_usaha: "",
			apakah_lokasi_usaha_tersedia: "",
			pengalaman_bisnis: "",
			modal: "",
			alasan: "",
		},
	});

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/kemitraan`,
				data
			);

			if (response.status === 201) {
				form.reset();
				toast.success("Data berhasil disimpan");
			}
		} catch (error) {
			toast.error("Terjadi kesalahan saat menyimpan data");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
				<div className="flex flex-col md:flex-row items-start gap-10">
					<div className="w-full">
						<h1 className="text-lg font-semibold">Informasi Pribadi</h1>{" "}
						<div className="mt-4 space-y-4">
							<FormField
								control={form.control}
								name="nama_lengkap"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama Lengkap</FormLabel>
										<FormControl>
											<Input placeholder="Masukan nama lengkap" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="nik"
								render={({ field }) => (
									<FormItem>
										<FormLabel>NIK</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="masukan NIK "
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="jenis_kelamin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jenis Kelamin</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex space-x-2"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Laki-Laki" />
													</FormControl>
													<FormLabel className="font-normal">
														Laki-Laki
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Perempuan" />
													</FormControl>
													<FormLabel className="font-normal">
														Perempuan
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status_pernikahan"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status Pernikahan</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex space-x-2"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Belum Menikah" />
													</FormControl>
													<FormLabel className="font-normal">
														Belum Menikah
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Sudah Menikah" />
													</FormControl>
													<FormLabel className="font-normal">
														Sudah Menikah
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="alamat_domisili"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Alamat Domisili</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Masukan alamat "
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="no_telepon"
								render={({ field }) => (
									<FormItem>
										<FormLabel>No.Telepon/WhatsApp</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Masukan nomor telepon "
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Masukan email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tempat_tanggal_lahir"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tempat, Tanggal Lahir</FormLabel>
										<FormControl>
											<Input
												placeholder="Masukan tempat dan tanggal lahir"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="w-full">
						<h1 className="text-lg font-semibold">Informasi Kemitraan</h1>{" "}
						<div className="mt-4 space-y-4">
							<FormField
								control={form.control}
								name="jenis_kemitraan"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jenis Kemitraan</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex space-x-2"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Booth" />
													</FormControl>
													<FormLabel className="font-normal">Booth</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Kios Kecil" />
													</FormControl>
													<FormLabel className="font-normal">
														Kios Kecil
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lokasi_usaha"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Lokasi Usaha</FormLabel>
										<FormControl>
											<Input placeholder="Masukan lokasi usaha" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="apakah_lokasi_usaha_tersedia"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apakah Lokasi Usaha Sudah Tersedia ?</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex space-x-2"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Ya, Sudah Tersedia" />
													</FormControl>
													<FormLabel className="font-normal">
														Ya, Sudah Tersedia
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Belum, Masih Dalam Proses Pencarian" />
													</FormControl>
													<FormLabel className="font-normal">
														Belum, Masih Dalam Proses Pencarian
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="pengalaman_bisnis"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pengalaman Bisnis</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex space-x-2"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Tidak" />
													</FormControl>
													<FormLabel className="font-normal">Tidak</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="Ya" />
													</FormControl>
													<FormLabel className="font-normal">
														Ya, Jenis Usaha
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="modal"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Modal Yang Disiapkan</FormLabel>
										<FormControl>
											<Input
												placeholder="Masukan modal yang disiapkan"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="alasan"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Alasan Tertarik Bergabung</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Jelaskan secara singkat motivasi anda"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="">
					<Button type="submit" className="w-full md:w-fit py-5 mt-4 bg-blue-500" disabled={loading}>
						{loading ? "Loading..." : "Submit"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default FormRegistrasi;
