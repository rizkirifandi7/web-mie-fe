import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const DetailFeedback = ({ rowData }) => {
	const [openHapus, setOpenHapus] = React.useState(false);

	return (
		<div>
			<Dialog open={openHapus} onOpenChange={setOpenHapus}>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon" className="shadow-none ">
						<Eye />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Detail Feedback</DialogTitle>
						<DialogDescription>
							Detail feedback yang diberikan oleh customer
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<div>
							<h1 className="text-sm font-semibold">Nama</h1>
							<p className="text-base">{rowData.nama || "-"}</p>
						</div>
						<div>
							<h1 className="text-sm font-semibold">No Telepon</h1>
							<p className="text-base">{rowData.nomor_telepon || "-"}</p>
						</div>
						<div>
							<h1 className="text-sm font-semibold">Kritik</h1>
							<p className="text-base">{rowData.kritik}</p>
						</div>
						<div>
							<h1 className="text-sm font-semibold">Saran</h1>
							<p className="text-base">{rowData.saran}</p>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DetailFeedback;
