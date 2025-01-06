"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const TentangKamiDashboard = () => {
	const [data, setData] = React.useState([]);
	const [deskripsi, setDeskripsi] = React.useState("");
	const [visi, setVisi] = React.useState("");
	const [misi, setMisi] = React.useState("");
	const [file, setFile] = React.useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/informasi/1`
			);
			const data = await response.json();
			setData(data.informasi);
			setDeskripsi(data.informasi.deskripsi);
			setVisi(data.informasi.visi);
			setMisi(data.informasi.misi);
			setFile(data.informasi.gambar);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("deskripsi", deskripsi);
		formData.append("visi", visi);
		formData.append("misi", misi);
		if (file) {
			formData.append("gambar", file);
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/informasi/1`,
				{
					method: "PUT",
					body: formData,
				}
			);
			if (response.ok) {
				toast.success("Data berhasil diupdate");
			} else {
				toast.error("Data gagal diupdate");
			}
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<form
			className="basis-1/2 flex flex-col gap-4 rounded-md"
			onSubmit={handleSubmit}
		>
			<div className="flex items-center gap-2">
				<div className="w-32 h-32 bg-gray-100 rounded-md">
					{file && (
						<Image
							src={file}
							width={150}
							height={150}
							alt="gambar"
							className="w-32 h-32 object-cover rounded-md"
						/>
					)}
				</div>
				<Input
					type="file"
					className="w-fit"
					onChange={(e) => setFile(e.target.files[0])}
				/>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Deskripsi</Label>
				<Textarea
					className="p-2 border rounded-md h-32 resize-none"
					value={deskripsi}
					onChange={(e) => setDeskripsi(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Visi</Label>
				<Textarea
					className="p-2 border rounded-md resize-none"
					value={visi}
					onChange={(e) => setVisi(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Misi</Label>
				<Textarea
					className="p-2 border rounded-md resize-none"
					value={misi}
					onChange={(e) => setMisi(e.target.value)}
				/>
			</div>
			<Button type="submit" className="text-white w-fit">
				Update
			</Button>
		</form>
	);
};

export default TentangKamiDashboard;
