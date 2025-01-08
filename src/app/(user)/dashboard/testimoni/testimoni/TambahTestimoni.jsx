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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	nama: z.string().nonempty("Nama harus diisi."),
	testimoni: z.string().nonempty("Testimoni harus diisi."),
	foto: z.any(),
	status: z.any(),
});

const TambahTestimoni = ({ fetchData }) => {
	const [openTambah, setOpenTambah] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama: "",
			testimoni: "",
			foto: "",
			status: "",
		},
	});

	const handleTambah = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("nama", data.nama);
			formData.append("testimoni", data.testimoni);
			formData.append("foto", data.foto[0]);
			formData.append("status", data.status);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/testimoni`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.status === 201) {
				toast.success("Testimoni berhasil ditambahkan");
				form.reset();
				setOpenTambah(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error adding testimoni:", error);
			toast.error("Gagal menambahkan testimoni");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle />
					Tambah Testimoni
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Testimoni</DialogTitle>
					<DialogDescription>Tambahkan testimoni baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleTambah)}
						className="space-y-4"
					>
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
							name="testimoni"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Testimoni</FormLabel>
									<FormControl>
										<Textarea
											className="shadow-none resize-none"
											placeholder="masukkan testimoni..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="hide">Sembunyikan</SelectItem>
												<SelectItem value="show">Tampilkan</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-y-2">
							<Label className="">Foto</Label>
							<Input
								type="file"
								className="shadow-none h-full py-1.5"
								onChange={(e) => form.setValue("foto", e.target.files)}
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

export default TambahTestimoni;
