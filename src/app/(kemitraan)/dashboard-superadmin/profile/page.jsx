"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama: z.string().nonempty("Nama harus diisi."),
	email: z.string().nonempty("Email harus diisi."),
	password: z.any(),
});

const PageProfile = () => {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true); // Tambahkan loading state

	const fetchDataUserById = async (userId) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
			);

			form.reset({
				nama: response.data.data.nama,
				email: response.data.data.email,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false); // Set loading to false setelah fetch selesai
		}
	};

	React.useEffect(() => {
		const tokenUser = Cookies.get("auth_session");
		if (tokenUser) {
			const decodedToken = JSON.parse(atob(tokenUser.split(".")[1]));
			setUser(decodedToken);
		}
	}, []);

	React.useEffect(() => {
		if (user && user.id) {
			fetchDataUserById(user.id);
		}
	}, [user]);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: "",
			email: "",
			password: "",
		},
	});

	const handleEdit = async (data) => {
		if (!user || !user.id) {
			toast.error("User ID tidak tersedia. Silakan coba lagi.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("nama", data.nama);
			formData.append("email", data.email);

			// Hanya append password jika diisi
			if (data.password) {
				formData.append("password", data.password);
			}

			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.status === true) {
				toast.success("User berhasil diupdate");
				form.reset();
				fetchDataUserById(user.id); // Fetch ulang data setelah update
			}
		} catch (error) {
			console.error("Error updating user:", error);
			toast.error("Gagal update user");
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex justify-center items-center h-full">
			<Card className="p-4 rounded-md min-w-[625px]">
				<h1 className="mb-4">Update Profile</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
						<FormField
							control={form.control}
							name="nama"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nama..."
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan email..."
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan password..."
											{...field}
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full mt-2">
							Submit
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default PageProfile;
