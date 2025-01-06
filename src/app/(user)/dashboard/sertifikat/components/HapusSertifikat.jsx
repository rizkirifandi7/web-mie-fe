import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const HapusSertifikat = ({ id, fetchData }) => {
	const [openHapus, setOpenHapus] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleDelete = async () => {
		setIsLoading(true);
		try {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_BASE_URL}/sertifikat/${id}`
			);

			if (response.status === 204) {
				toast.success("Sertifikat berhasil dihapus");
				setOpenHapus(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error deleting sertifikat:", error);
			toast.error("Gagal menghapus sertifikat");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<Dialog open={openHapus} onOpenChange={setOpenHapus}>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon" className="shadow-none">
						<Trash2 />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Hapus Sertifikat</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus sertifikat ini?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="destructive"
							className="w-full"
							onClick={handleDelete}
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Hapus"}
						</Button>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => setOpenHapus(false)}
						>
							Batal
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default HapusSertifikat;
