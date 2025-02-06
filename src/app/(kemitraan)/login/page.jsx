"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setCookie } from "@/actions/cookies";

// Form validation schema
const FormSchema = z.object({
	email: z
		.string()
		.email("Email must be valid.")
		.nonempty("Email is required."),
	password: z.string().nonempty("Password is required."),
});

const PageLogin = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: { email: "", password: "" },
	});

	const onLogin = useCallback(
		async (data) => {
			setIsLoading(true);
			try {
				const { email, password } = data;
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;

				if (!apiUrl) {
					throw new Error("API URL is not set in the environment variables.");
				}

				const response = await axios.post(
					`${apiUrl}/auth/login`,
					{ email, password },
					{ headers: { "Content-Type": "application/json" } }
				);

				const {
					role,
					data: { token },
				} = response.data;

				await setCookie("auth_session", token);

				const routeMap = {
					mitra: "/dashboard-mitra/home",
					admin: "/dashboard-superadmin/bahan-baku",
				};

				if (routeMap[role]) {
					router.push(routeMap[role]);
					toast.success("Login successful.");
				} else {
					toast.error("You do not have access.");
				}
			} catch (error) {
				toast.error(
					error.response?.data?.message || "Invalid email or password."
				);
			} finally {
				setIsLoading(false);
			}
		},
		[router]
	);

	return (
		<div className="flex justify-center items-center w-full min-h-screen bg-white">
			<Card className="w-[450px]">
				<CardHeader>
					<div className="flex flex-col justify-center items-center my-8 gap-2">
						<Image
							src="/logobrand.png"
							width={80}
							height={80}
							alt="Logo"
							priority
						/>
						<p className="text-base font-bold">Demiehan</p>
					</div>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email and password to log in
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
							{["email", "password"].map((field) => (
								<FormField
									key={field}
									control={form.control}
									name={field}
									render={({ field: inputProps }) => (
										<FormItem>
											<FormLabel>
												{field.charAt(0).toUpperCase() + field.slice(1)}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={`Enter your ${field}...`}
													{...inputProps}
													type={field === "password" ? "password" : "text"}
													disabled={isLoading}
													className="w-full py-6"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
							<Button
								type="submit"
								className="w-full py-6 rounded-lg bg-blue-500 text-white hover:bg-slate-800"
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Login"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default React.memo(PageLogin);
