"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const TentangKamiDashboard = () => {
	const [data, setData] = React.useState({
		deskripsi: "",
		visi: "",
		misi: "",
		gambar: null,
	});

	const fetchData = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/informasi/1`
			);
			const result = await response.json();
			setData(result.informasi);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			formData.append(key, data[key]);
		});

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
					{data.gambar && (
						<Image
							src={data.gambar}
							width={150}
							height={150}
							alt="gambar"
							className="w-32 h-32 object-cover rounded-md"
						/>
					)}
				</div>
				<div>
					<Label>Gambar</Label>
					<Input
						type="file"
						className="w-fit"
						name="gambar"
						onChange={handleChange}
					/>
				</div>
			</div>
			{["deskripsi", "visi", "misi"].map((field) => (
				<div key={field} className="flex flex-col gap-1.5">
					<Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
					<Textarea
						className="p-2 border h-[100px] rounded-md resize-none"
						name={field}
						value={data[field]}
						onChange={handleChange}
					/>
				</div>
			))}
			<Button type="submit" className="text-white w-fit">
				Update
			</Button>
		</form>
	);
};

export default TentangKamiDashboard;
