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
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama_cabang: z.string().nonempty("Nama_cabang harus diisi."),
	alamat: z.string().nonempty("Alamat harus diisi."),
});

const TambahCabang = ({ fetchData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_cabang: "",
			alamat: "",
		},
	});

	const handleTambah = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("nama_cabang", data.nama_cabang);
			formData.append("alamat", data.alamat);

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/cabang`,
				{
					nama_cabang: data.nama_cabang,
					alamat: data.alamat,
				}
			);

			if (response.status === 201) {
				toast.success("Cabang berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error adding cabang:", error);
			toast.error("Gagal menambahkan cabang");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle />
					Tambah Cabang
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Cabang</DialogTitle>
					<DialogDescription>Tambahkan cabang baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="nama_cabang"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Cabang</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nama cabang..."
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
							name="alamat"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Alamat</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan alamat..."
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
							name="link_gmaps"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link Maps</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan link..."
											{...field}
											type="text"
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
								{isLoading ? "Loading..." : "Tambah"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default TambahCabang;
