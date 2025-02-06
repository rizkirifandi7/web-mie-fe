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
import { Eye } from "lucide-react";
import React from "react";

const DetailPesananBahanBaku = ({ rowData }) => {
	const [openHapus, setOpenHapus] = React.useState(false);

	return (
		<div>
			<Dialog open={openHapus} onOpenChange={setOpenHapus}>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon">
						<Eye />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Detail Pesanan Bahan Baku</DialogTitle>
						<DialogDescription>
							Berikut ini detail pesanan dari bahan baku yang dipesan.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="">
							<h1 className="font-bold">Status</h1>
							<p className="capitalize">
								{rowData.status ? rowData.status : "Tidak ada kategori"}
							</p>
						</div>
						<div className="">
							<h1 className="font-bold">Nama</h1>
							<p className="text-base capitalize">{rowData.user?.nama}</p>
						</div>
						<div className="">
							<h1 className="font-bold">Order Bahan</h1>
							{rowData.order_bahan_detail.map((item, index) => (
								<div key={index}>
									{item.bahan_baku.nama_bahan}
									{`(${item.bahan_baku.jumlah})`} - {item.jumlah}
								</div>
							))}
						</div>

						<div className="">
							<h1 className="font-bold">Total Harga</h1>
							<p>
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
								}).format(parseFloat(rowData.total_harga))}
							</p>
						</div>
					</div>
					<DialogFooter>
						<div className="w-full" onClick={() => setOpenHapus(false)}>
							<Button variant="outline" className="w-full">
								Tutup
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DetailPesananBahanBaku;
