"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TextEditor from "./TextEditor";

const PageTambahBerita = () => {
	return (
		<div className="p-4">
			<Link
				href="/dashboard/berita-artikel"
				className="inline-flex items-center gap-1 text-sm mb-4 text-slate-500 hover:text-black"
			>
				<ArrowLeft size={14} />
				Kembali
			</Link>
			<TextEditor title="Tambah Data" />
		</div>
	);
};

export default PageTambahBerita;
