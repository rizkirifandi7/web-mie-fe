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
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

const HapusBahanBaku = ({ id, fetchData }) => {
	const [openHapus, setOpenHapus] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const handleDelete = async () => {
		setLoading(true);
		try {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/bahan-baku/${selectedId}`
			);
			if (response.status === 200) {
				toast.success("Bahan baku berhasil dihapus");
				setOpenHapus(false);
				fetchData();
			}
		} catch (error) {
			console.error("Error deleting bahan baku:", error);
			toast.error("Gagal menghapus bahan baku");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Dialog open={openHapus} onOpenChange={setOpenHapus}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shadow-none "
						onClick={() => {
							setSelectedId(id);
						}}
					>
						<FiTrash2 />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Hapus Bahan baku</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus bahan baku ini?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="destructive"
							className="w-full"
							onClick={() => handleDelete()}
							disabled={loading}
						>
							{loading ? "Loading..." : "Hapus"}
						</Button>
						<div className="w-full" onClick={() => setOpenHapus(false)}>
							<Button variant="outline" className="w-full">
								Batal
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default HapusBahanBaku;
