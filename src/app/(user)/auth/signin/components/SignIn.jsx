"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = async (data) => {
		const { email, password } = data;

		try {
			const response = await Login({ email, password });

			if (response.role === "admin") {
				setCookie("auth_session", response.token);
				router.push("/admin/dashboard");
			} else {
				toast.error("Anda tidak memiliki akses.");
			}
		} catch (error) {
			console.error("Error login:", error);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen w-full">
			<Card className="md:w-1/4">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Masukan email dan password untuk login.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onLogin)} className=" space-y-6">
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
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
