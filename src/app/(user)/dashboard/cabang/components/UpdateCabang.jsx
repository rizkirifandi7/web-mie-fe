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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama_cabang: z.string().nonempty("Nama harus diisi."),
	alamat: z.string().nonempty("Alamat harus diisi."),
	link_gmap: z.string().nonempty("Link Map harus diisi."),
});

const UpdateCabang = ({ fetchData, id, rowData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_cabang: rowData.nama_cabang,
			alamat: rowData.alamat,
			link_gmap: rowData.link_gmap,
		},
	});

	const handleUpdate = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("nama_cabang", data.nama_cabang);
			formData.append("alamat", data.alamat);
			formData.append("link_gmap", data.link_gmap);

			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/cabang/${id}`,
				{
					nama_cabang: data.nama_cabang,
					alamat: data.alamat,
					link_gmap: data.link_gmap,
				}
			);

			if (response.status === 200) {
				toast.success("Cabang berhasil diupdate");
				form.reset();
				setOpenTambah(false);
				fetchData();
			} else {
				toast.error("Gagal mengupdate cabang");
			}
		} catch (error) {
			console.error("Error updating cabang:", error);
			toast.error("Gagal mengupdate cabang");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<MdOutlineEdit />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Cabang</DialogTitle>
					<DialogDescription>Update cabang baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdate)}
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
							name="link_gmap"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link Map</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan link map..."
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
								{isLoading ? "Loading..." : "Update Cabang"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateCabang;
