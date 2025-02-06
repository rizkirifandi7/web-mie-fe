"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Login } from "@/services/api/auth";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { setCookie } from "@/actions/cookies";
import Image from "next/image";
import React from "react";
import axios from "axios";

const FormSchema = z.object({
	email: z
		.string()
		.email({
			message: "Email must be valid email.",
		})
		.trim()
		.min(1, "Email cannot be empty"),
	password: z.string().trim().min(1, "Password cannot be empty"),
});

const SignIn = () => {
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = async (data) => {
		const { email, password } = data;
		setLoading(true);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
				{
					email,
					password,
				}
			);

			if (response.data.role === "admin") {
				setCookie("auth_token", response.data.token);
				router.push("/dashboard/menu");
				toast.success("Login berhasil.");
			} else {
				toast.error("Anda tidak memiliki akses.");
			}
		} catch (error) {
			console.error("Error login:", error);
			toast.error("Login gagal.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen w-full bg-[#f5f5f5]">
			<Card className="md:w-1/4 g">
				<CardHeader>
					<div className="flex flex-col gap-2 justify-center items-center mb-4">
						<Image src="/logo.svg" width="100" height="100" alt="Logo" />
						<h1 className="font-bold">Demiehan</h1>
					</div>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Masukan email dan password untuk login.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="masukkan email..."
												{...field}
												type="text"
												className="py-6"
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
												placeholder="masukkan password..."
												{...field}
												type="password"
												className="py-6"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full bg-blue-500 py-6"
								disabled={loading}
							>
								{loading ? "Loading..." : "Login"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
