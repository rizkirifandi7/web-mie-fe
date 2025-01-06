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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	jenis_kemitraan: z.string().nonempty("Jenis kemitraan harus diisi."),
	ukuran: z.string().nonempty("Ukuran harus diisi."),
	gambar: z.any(),
	harga: z.any(),
});

const TambahPaketKemitraan = ({ fetchData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			jenis_kemitraan: "",
			ukuran: "",
			gambar: null,
			harga: "",
		},
	});

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("jenis_kemitraan", data.jenis_kemitraan);
			formData.append("ukuran", data.ukuran);
			formData.append("harga", data.harga);

			// Tambahkan setiap file ke FormData
			data.gambar.forEach((file) => {
				formData.append("gambar", file); // Tambahkan satu per satu
			});

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/paket-kemitraan`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.status === 201) {
				toast.success("Paket kemitraan berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchData();
			} else {
				const resJson = await response.json();
				toast.error(`Gagal menambahkan: ${resJson.message}`);
			}
		} catch (error) {
			console.error("Error adding paket kemitraan:", error);
			toast.error("Gagal menambahkan paket kemitraan");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle />
					Tambah Paket Kemitraan
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Paket Kemitraan</DialogTitle>
					<DialogDescription>Tambahkan paket kemitraan baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="jenis_kemitraan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis Kemitraan</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan jenis kemitraan..."
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
							name="ukuran"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ukuran</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan ukuran..."
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
						<div className="space-y-2">
							<Label className="">Gambar</Label>
							<Input
								type="file"
								className="shadow-none h-full py-1.5"
								multiple
								onChange={(e) =>
									form.setValue("gambar", Array.from(e.target.files))
								}
							/>
						</div>
						<DialogFooter>
							<Button type="submit" className="w-full mt-2" disabled={loading}>
								{loading ? "Loading..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default TambahPaketKemitraan;
