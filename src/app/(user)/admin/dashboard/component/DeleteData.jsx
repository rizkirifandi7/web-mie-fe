import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deleteMenu } from "@/services/api/menu";
import { toast } from "sonner";

const DeleteData = ({ menuId, fetchData }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async (id) => {
		try {
			await deleteMenu(id);
			toast.success("Data berhasil dihapus");
			setIsOpen(false);
			fetchData();
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="flex items-center p-2 bg-black text-white">
					<Trash2 />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Hapus Data</DialogTitle>
					<DialogDescription>
						Apakah Anda yakin ingin menghapus data ini?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="w-full flex flex-row gap-2">
					<Button
						type="submit"
						variant="destructive"
						className="w-full"
						onClick={() => handleDelete(menuId)}
					>
						Hapus
					</Button>
					<DialogClose asChild>
						<Button variant="outline" className="w-full">
							Batal
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteData;
