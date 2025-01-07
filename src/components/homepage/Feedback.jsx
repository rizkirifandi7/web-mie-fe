"use client";

import React from "react";
import Judul from "../Judul";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";

const Feedback = () => {
	const [nama, setNama] = React.useState("");
	const [kritik, setKritik] = React.useState("");
	const [saran, setSaran] = React.useState("");
	const [nomor, setNomor] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = async (e) => {
		setLoading(true);
		try {
			e.preventDefault();
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`,
				{
					nama,
					kritik,
					saran,
					nomor_telepon: nomor,
				}
			);

			if (response.status === 201) {
				toast.success("Terima kasih atas kritik dan saran Anda.");
				setNama("");
				setKritik("");
				setSaran("");
				setNomor("");
			}
		} catch (error) {
			toast.error("Terjadi kesalahan. Silahkan coba lagi.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="w-full h-full" id="feedback">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center w-full">
					<Judul mainText="D'EMIEHAN" subText="Kritik & Saran" />

					<Card className="flex flex-col items-center w-1/2 mt-14 p-4">
						<form
							className="flex flex-col gap-4 mt-4 w-full"
							onSubmit={handleSubmit}
						>
							<Input
								type="text"
								placeholder="Nama (Opsional)"
								className="border p-2 rounded-lg w-full"
								value={nama}
								onChange={(e) => setNama(e.target.value)}
							/>
							<Input
								type="number"
								placeholder="No. Telepon (Opsional)"
								className="border p-2 rounded-lg w-full"
								value={nomor}
								onChange={(e) => setNomor(e.target.value)}
							/>
							<Textarea
								placeholder="Kritik"
								className="border p-2 rounded-lg"
								value={kritik}
								onChange={(e) => setKritik(e.target.value)}
							></Textarea>
							<Textarea
								placeholder="Saran"
								className="border p-2 rounded-lg"
								value={saran}
								onChange={(e) => setSaran(e.target.value)}
							></Textarea>
							<Button
								type="submit"
								className="bg-blue-500 text-white p-2 rounded-lg"
								disabled={loading}
							>
								{loading ? "Loading..." : "Kirim"}
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default Feedback;
