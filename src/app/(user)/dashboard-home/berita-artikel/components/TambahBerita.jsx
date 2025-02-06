import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const TambahBerita = () => {
	return (
		<>
			<Link href="/dashboard/berita-artikel/tambah-berita">
				<Button>
					<PlusCircle />
					Tambah Berita Atau Artikel
				</Button>
			</Link>
		</>
	);
};

export default TambahBerita;
