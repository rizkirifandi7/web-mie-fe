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
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import Cookies from "js-cookie";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama_bahan: z.string().nonempty("Nama harus diisi."),
	jumlah: z.string().nonempty("Jumlah harus diisi."),
	harga: z.any(),
});

const TambahBahanBaku = ({ fetchData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_bahan: "",
			jumlah: "",
			harga: "",
		},
	});

	const handleTambah = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("nama_bahan", data.nama_bahan);
			formData.append("jumlah", data.jumlah);
			formData.append("harga", data.harga);

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/bahan-baku`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				toast.success("Bahan baku berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error adding bahan baku:", error);
			toast.error("Gagal menambahkan bahan baku");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle />
					Tambah Bahan baku
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Bahan baku</DialogTitle>
					<DialogDescription>Tambahkan bahan baku baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="nama_bahan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Bahan</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nama bahan..."
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
							name="jumlah"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jumlah</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan jumlah..."
											{...field}
											type="text"
										/>
									</FormControl>
									<FormDescription>
										Contoh: 1 kg, 2 kg, 3 kg, dst.
									</FormDescription>
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

export default TambahBahanBaku;
