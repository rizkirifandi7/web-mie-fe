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
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	keterangan: z.string().nonempty("Keterangan harus diisi."),
	gambar: z.any(),
});

const UpdateSertifikat = ({ fetchData, id, rowData }) => {
	const [openUpdate, setOpenUpdate] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			keterangan: rowData.keterangan,
			gambar: rowData.gambar,
		},
	});

	const handleUpdate = async (data) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("keterangan", data.keterangan);
			formData.append("gambar", data.gambar[0]);

			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/sertifikat/${id}`,
				formData
			);

			if (response.status === 200) {
				toast.success("Sertifikat berhasil diupdate");
				form.reset();
				setOpenUpdate(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error adding sertifikat:", error);
			toast.error("Gagal menambahkan sertifikat");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<MdOutlineEdit />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Sertifikat</DialogTitle>
					<DialogDescription>Updatekan sertifikat baru.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdate)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="keterangan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Keterangan</FormLabel>
									<FormControl>
										<Input
											className="shadow-none"
											placeholder="masukkan keterangan..."
											{...field}
											type="text"
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
								onChange={(e) => form.setValue("gambar", e.target.files)}
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

export default UpdateSertifikat;