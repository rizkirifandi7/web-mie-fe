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
import Cookies from "js-cookie";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama_kategori: z.string().nonempty("Nama kategori harus diisi."),
});

const TambahKategoriMenu = ({ fetchDataKategoriMenu }) => {
	const [openTambah, setOpenTambah] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_kategori: "",
		},
	});

	const handleTambah = async (data) => {
		try {
			const token = Cookies.get("auth_session");
			const formData = new FormData();
			formData.append("nama_kategori", data.nama_kategori);

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/kategori`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				toast.success("Kategori Menu berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchDataKategoriMenu();
			}
		} catch (error) {
			console.error("Error adding kategori menu:", error);
			toast.error("Gagal menambahkan kategori menu");
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button className="bg-blue-500">
					<PlusCircle />
					Tambah Kategori Menu
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Kategori Menu</DialogTitle>
					<DialogDescription>Tambahkan kategori menu baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="nama_kategori"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Kategori</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan nama kategori..."
											{...field}
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="w-full mt-2">
								Submit
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default TambahKategoriMenu;
