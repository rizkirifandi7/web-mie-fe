"use client";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const DetailKemitraan = () => {
	const { id } = useParams();
	const [data, setData] = React.useState([]);

	const fetchData = React.useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/kemitraan/${id}`
			);
			const data = response.data;
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, [id]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="">
			<Link href="/dashboard/kemitraan" className="inline-flex items-center text-sm gap-2 pl-6">
				<ArrowLeft size={16} />
				Kembali
			</Link>
			<div className="border p-6 m-6 rounded-lg">
				<h1 className="text-2xl font-bold text-center">Detail Kemitraan</h1>
				<div className="grid grid-flow-col gap-10 mt-10">
					<div className="w-full">
						<h1 className="font-semibold mb-4">Informasi Pribadi</h1>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-1.5">
								<Label>Nama</Label>
								<p className="border p-2 rounded-lg">{data.nama_lengkap}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>NIK</Label>
								<p className="border p-2 rounded-lg">{data.nik}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Jenis Kelamin</Label>
								<p className="border p-2 rounded-lg">{data.jenis_kelamin}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Status Pernikahan</Label>
								<p className="border p-2 rounded-lg">
									{data.status_pernikahan}
								</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Alamat Domisili</Label>
								<p className="border p-2 rounded-lg">{data.alamat_domisili}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>No. Telepon</Label>
								<p className="border p-2 rounded-lg">{data.no_telepon}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Email</Label>
								<p className="border p-2 rounded-lg">{data.email}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Tempat, Tanggal Lahir</Label>
								<p className="border p-2 rounded-lg">
									{data.tempat_tanggal_lahir}
								</p>
							</div>
						</div>
					</div>
					<div className="w-full">
						<h1 className="font-semibold mb-4">Informasi Kemitraan</h1>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-1.5">
								<Label>Jenis Kemitraan</Label>
								<p className="border p-2 rounded-lg">{data.jenis_kemitraan}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Lokasi Usaha</Label>
								<p className="border p-2 rounded-lg">{data.lokasi_usaha}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Apakah Lokasi Usaha Tersedia</Label>
								<p className="border p-2 rounded-lg">
									{data.apakah_lokasi_usaha_tersedia}
								</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Pengalaman Bisnis</Label>
								<p className="border p-2 rounded-lg">
									{data.pengalaman_bisnis}
								</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Modal</Label>
								<p className="border p-2 rounded-lg">{data.modal}</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Alasan</Label>
								<p className="border p-2 rounded-lg">{data.alasan}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailKemitraan;
